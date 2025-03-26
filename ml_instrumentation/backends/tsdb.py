import logging
from typing import Any
from ml_instrumentation.backends.base import BaseBackend, Point, SqlPoint
import ml_instrumentation._utils.sqlite as sqlu

logger = logging.getLogger('ml-instrumentation')



class TSDB(BaseBackend):
    def __init__(self, conninfo: str):
        import psycopg

        self._conninfo = conninfo
        self._con = psycopg.connect(conninfo)
        self._con.row_factory = row_factory

        self._built = set[str]()


    # -----------
    # -- Setup --
    # -----------
    def init_db(self) -> None:
        cur = self._con.cursor()
        res = cur.execute("""
            SELECT table_name FROM information_schema.tables;
        """)
        self._built = set(r[0] for r in res.fetchall())


    def _setup_table(self):
        if 'results' in self._built:
            return

        cur = self._con.cursor()
        cur.execute("""
            CREATE TABLE results (
                time TIMESTAMP WITH TIME ZONE NOT NULL,
                step INTEGER NOT NULL,
                metric TEXT NOT NULL,
                id INTEGER NOT NULL,
                measurement DOUBLE PRECISION NOT NULL
            );
            SELECT create_hypertable('results', 'time', chunk_time_interval => INTERVAL 1d);
            CREATE INDEX IF NOT EXISTS results_metric_idx ON results (metric);
            CREATE INDEX IF NOT EXISTS results_id_idx ON results (id);
            ALTER TABLE results SET (
                timescaledb.compress,
                timescaledb.compress_segmentby='metric'
            );
        """)

    # -------------
    # -- Reading --
    # -------------
    def get_tables(self):
        return self._built

    def read_metric(self, metric: str, exp_id: int | str | None = None):
        cond = ''
        if exp_id is not None:
            cond = f'WHERE id={sqlu.maybe_quote(exp_id)}'

        cur = self._con.cursor()
        try:
            query: Any = f'SELECT * FROM results {cond}'
            cur = cur.execute(query)
            res: list[Any] = cur.fetchall()
        except Exception:
            logger.warning(f'Specified metric/exp_id does not exist: <{metric}, {exp_id}>')
            res = []

        return res

    # -------------
    # -- Writing --
    # -------------
    def write_many(self, points: dict[str, dict[int, Point]]):
        cur = self._con.cursor()
        self._setup_table()

        for m, sub in points.items():
            for exp_id, p in sub.items():
                cur.executemany('INSERT INTO results (time, step, metric, id, measurement) VALUES (now(), ?, ?, ?, ?)', [(p.frame, m, exp_id, p.data)])

        self._con.commit()

    # ---------------
    # -- Lifecycle --
    # ---------------

    def dump(self) -> str:
        raise Exception('Dump is not possible for TSDB backend')

    def load(self, data: Any):
        self.init_db()

    def close(self):
        self._con.close()

    def __getstate__(self) -> object:
        self.close()
        return {
            'conninfo': self._conninfo,
        }

    def __setstate__(self, state: dict[str, Any]):
        import psycopg
        self._conninfo = state['conninfo']
        self._con = psycopg.connect(self._conninfo)
        self._con.row_factory = row_factory


def row_factory(cur):
    def _inner(d):
        return SqlPoint(*d)

    return _inner
