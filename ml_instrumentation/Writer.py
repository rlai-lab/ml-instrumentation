import time
import logging
from collections import defaultdict
from typing import Any
from concurrent.futures import ThreadPoolExecutor, Future

from ml_instrumentation.backends.base import BaseBackend, Point, SqlPoint

logger = logging.getLogger('ml-instrumentation')

class Writer:
    def __init__(
        self,
        backend: BaseBackend,
        low_watermark: int = 64,
        high_watermark: int = 256,
    ):
        # ------------
        # -- config --
        # ------------
        self._lw = low_watermark
        self._hw = high_watermark

        # ---------------
        # -- externals --
        # ---------------
        self._backend = backend
        self._exec = ThreadPoolExecutor(max_workers=1)
        self._write_future: Future | None = None

        # -----------
        # -- state --
        # -----------
        self._i = 0
        self._buffer: dict[str, dict[int, Point]] = defaultdict(dict)

        self._avg_write_time = -1
        self._last_write_time = -1

        # -------------------------
        # -- load existing state --
        # -------------------------
        backend.init_db()

    # ------------
    # -- IO API --
    # ------------
    def write(self, d: Point):
        self._buffer[d.metric][self._i] = d
        self._i += 1

        if self._i > self._hw:
            assert self._write_future is not None
            self._write_future.result()
            logger.warning(f'Buffer reached high watermark. (last write: {self._last_write_time}s, avg write: {self._avg_write_time}s)')
            self.sync()

        elif self._i > self._lw:
            self.sync()

    def sync(self):
        if self._write_future is not None and not self._write_future.done():
            return

        data = self._buffer
        self._buffer = defaultdict(dict)
        self._i = 0
        self._write_future = self._exec.submit(self._sync_async, data)

    def sync_now(self):
        if self._write_future is not None:
            self._write_future.result()

        self.sync()
        assert self._write_future is not None
        self._write_future.result()

    def read_metric(self, metric: str, exp_id: int | str | None = None) -> list[SqlPoint]:
        self.sync_now()
        return self._backend.read_metric(metric, exp_id)

    def dump(self) -> str:
        self.sync_now()
        return self._backend.dump()

    def load(self, data: Any):
        self._backend.load(data)

    def close(self):
        self.sync_now()
        self._backend.close()

    # -----------------
    # -- Utility API --
    # -----------------
    def metrics(self):
        buffered_keys = set(self._buffer.keys())
        return buffered_keys | self._backend.get_tables()

    def merge(self, other: str):
        self.sync_now()
        self._backend.merge(other)


    # -------------------
    # -- Backend logic --
    # -------------------
    def _sync_async(self, d: dict[str, dict[int, Point]]):
        start = time.perf_counter()
        self._backend.write_many(d)
        elapsed = time.perf_counter() - start

        self._last_write_time = elapsed
        if self._avg_write_time < 0:
            self._avg_write_time = elapsed
        else:
            self._avg_write_time = 0.9 * self._avg_write_time + 0.1 * elapsed
