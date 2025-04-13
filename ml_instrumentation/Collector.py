from collections.abc import Callable
from typing import Any

from ml_instrumentation.backends.base import BaseBackend
from ml_instrumentation.Sampler import Sampler, Ignore, Identity, identity
from ml_instrumentation.Writer import Writer, Point
from ml_instrumentation.backends.sqlite import Sqlite

try:
    import jax
except ImportError:
    jax = None


class Collector:
    def __init__(
        self,
        tmp_file: str = ':memory:',
        backend: BaseBackend | None = None,
        config: dict[str, Sampler | Ignore] | None = None,
        default: Identity | Ignore = identity,
        experiment_id: int | str | None = None,
        low_watermark: int = 1_000,
        high_watermark: int = 100_000,
    ):
        self._c = config or {}

        self._ignore = set(k for k, sampler in self._c.items() if isinstance(sampler, Ignore))
        self._sampler: dict[str, Sampler] = {
            k: sampler for k, sampler in self._c.items() if not isinstance(sampler, Ignore)
        }

        self._backend = backend or Sqlite(tmp_file)

        self._writer = Writer(
            backend=self._backend,
            low_watermark=low_watermark,
            high_watermark=high_watermark,
        )

        self._exp_id = experiment_id
        self._frame: int = -1

        # create this once and cache it since it is stateless
        # avoid recreating on every step
        self._def = default

        # cache some useful metadata
        self._idxs = set[int | str]()
        self._keys = set[str]()

    # -------------
    # -- Context --
    # -------------
    def set_experiment_id(self, id: str | int):
        self._exp_id = id
        self._frame = -1

    def get_current_experiment_id(self) -> str | int:
        assert self._exp_id is not None
        return self._exp_id

    def get_frame(self):
        return self._frame

    def next_frame(self):
        self._frame += 1

    def set_frame(self, frame: int):
        assert frame >= self._frame
        self._frame = frame

    def reset(self):
        self.next_frame()
        for k in self._sampler:
            v = self._sampler[k].end()
            if v is None:
                continue

            self._write(k, v)

        self._frame = -1

    def close(self):
        self._writer.close()

    # -------------
    # -- Storing --
    # -------------
    def collect(self, name: str, value: Any):
        if name in self._ignore:
            return

        if self._frame == -1:
            self.next_frame()

        v = self._sampler.get(name, self._def).next(value)
        if v is None:
            return

        self._write(name, v)

    def evaluate(self, name: str, lmbda: Callable[[], Any]):
        if name in self._ignore:
            return

        if self._frame == -1:
            self.next_frame()

        v = self._sampler.get(name, self._def).next_eval(lmbda)
        if v is None:
            return

        self._write(name, v)

    def collect_jax(self, name: str, value: Any):
        if jax is None:
            raise Exception('jax is not installed')

        def _callback(metrics: dict[str, Any]):
            assert jax is not None
            for name, value in metrics.items():
                if isinstance(value, jax.Array):
                    value = value.item()

                self.collect(name, value)

        metrics = {name: value}
        jax.debug.callback(_callback, metrics, ordered=False)

    # ---------------
    # -- Accessing --
    # ---------------
    def get(self, metric: str, experiment_id: int | str):
        return self._writer.read_metric(metric, experiment_id)

    def keys(self):
        return self._keys

    def experiment_ids(self):
        return self._idxs

    def merge(self, loc: str):
        self._writer.merge(loc)

    # --------------
    # -- Internal --
    # --------------
    def _write(self, k: str, v: Any):
        self._keys.add(k)
        d = Point(
            exp_id=self.get_current_experiment_id(),
            metric=k,
            frame=self._frame,
            data=v,
        )
        self._writer.write(d)

    # -------------------
    # -- Serialization --
    # -------------------

    def __getstate__(self):
        self._writer.sync_now()

        data = None
        if isinstance(self._backend, Sqlite) and self._backend.is_in_memory():
            data = self._writer.dump()

        ignore_keys = ['_writer']
        return {
            'data': data,
            'sub': {
                k: v for k, v in self.__dict__.items() if k not in ignore_keys
            },
        }

    def __setstate__(self, state: dict[str, Any]):
        for k, v in state['sub'].items():
            self.__dict__[k] = v

        self._writer = Writer(
            backend=self._backend,
            low_watermark=1_000,
            high_watermark=100_000,
        )

        if state['data'] is not None:
            self._writer.load(state['data'])
