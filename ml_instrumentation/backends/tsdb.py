import logging
import sqlalchemy
import time
from typing import Any
from sqlalchemy import URL
from sqlalchemy import text
from sqlalchemy_utils import create_database, database_exists
from ml_instrumentation.backends.base import BaseBackend, Point

logger = logging.getLogger('ml-instrumentation')


class TSDB(BaseBackend):
    def __init__(self, user: str, password: str, host: str, port: int, dbname: str):
        eng = get_sql_engine(user, password, host, port, dbname)
        self._con = eng.connect()
        self._built = set[str]()

    # -----------
    # -- Setup --
    # -----------
    def init_db(self) -> None:
        res = self._con.execute(text("""
            SELECT table_name FROM information_schema.tables;
        """))
        self._built = set(r[0] for r in res.fetchall())


    def _setup_table(self):
        if 'results' in self._built:
            return

        self._con.execute(text("""
            CREATE TABLE IF NOT EXISTS results (
                time TIMESTAMP WITH TIME ZONE NOT NULL,
                step INTEGER NOT NULL,
                metric TEXT NOT NULL,
                id INTEGER NOT NULL,
                measurement DOUBLE PRECISION NOT NULL
            );
            SELECT create_hypertable('results', 'time', chunk_time_interval => INTERVAL '1d');
            CREATE INDEX IF NOT EXISTS results_metric_idx ON results (metric);
            CREATE INDEX IF NOT EXISTS results_id_idx ON results (id);
        """))
        self._con.commit()

    # -------------
    # -- Reading --
    # -------------
    def get_tables(self):
        return self._built

    def read_metric(self, metric: str, exp_id: int | str | None = None):
        raise Exception('read_metric is not implemented')

    # -------------
    # -- Writing --
    # -------------
    def write_many(self, points: dict[str, dict[int, Point]]):
        self._setup_table()

        insert_sql = text("""
            INSERT INTO results
            (time, step, metric, id, measurement)
            VALUES (now(), :frame, :metric, :exp_id, :data)
        """)
        self._con.execute(
            insert_sql,
            [
                {'frame': p.frame, 'metric': m, 'exp_id': exp_id, 'data': p.data}
                for m, sub in points.items()
                for exp_id, p in sub.items()
            ]
        )
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
        return {}

    def __setstate__(self, state: dict[str, Any]):
        ...


def get_sql_engine(user: str, password: str, host: str, port: int, dbname: str):
    url_object = sqlalchemy.URL.create(
        drivername='postgresql+psycopg2',
        username=user,
        password=password,
        host=host,
        port=port,
        database=dbname,
    )
    logger.debug("creating sql engine...")
    engine = try_create_engine(url_object=url_object)

    maybe_create_database(engine.url)

    return engine

def try_create_engine(url_object: URL, backoff_seconds: int = 5, max_tries: int = 5):
    engine = None
    tries = 0
    while not engine is not None:
        if tries >= max_tries:
            raise Exception("sql engine creation failed")
        try:
            engine = sqlalchemy.create_engine(url_object, pool_recycle=280, pool_pre_ping=True)
        except Exception:
            logger.exception(f"failed to create sql engine, retrying in {backoff_seconds} seconds...")
            time.sleep(backoff_seconds)
        tries += 1

    return engine


def maybe_create_database(conn_url: URL, backoff_seconds: int = 5, max_tries: int = 5) -> None:
    if database_exists(conn_url):
        return

    success = False
    tries = 0
    while not success:
        if tries >= max_tries:
            raise Exception("database creation failed")
        try:
            if database_exists(conn_url):
                success = True
            else:
                create_database(conn_url)
                success = True
        except Exception as e:
            logger.warning(f"failed to create database, retrying in {backoff_seconds} seconds...")
            logger.error(e, exc_info=True)
            time.sleep(backoff_seconds)
        tries += 1
