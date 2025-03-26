from pathlib import Path
from typing import Any
import filelock
import logging
import os
import sqlite3
from ml_instrumentation.backends.base import BaseBackend, Point, SqlPoint
import ml_instrumentation._utils.sqlite as sqlu

logger = logging.getLogger('ml-instrumentation')


class Sqlite(BaseBackend):
    def __init__(self, path: str | Path):
        self._path = path
        self._con = sqlite3.connect(path, check_same_thread=False)
        self._con.row_factory = row_factory

        self._built = set[str]()

    # -----------
    # -- Setup --
    # -----------
    def init_db(self):
        if not os.path.exists(self._path) and str(self._path) != ':memory:':
            return

        cur = self._con.cursor()
        self._built |= sqlu.get_tables(cur)


    def _setup_table(self, cur: sqlite3.Cursor, name: str):
        if name in self._built:
            return

        cur.execute(f'CREATE TABLE "{name}"(frame INTEGER ASC, id, measurement)')
        self._built.add(name)

    def is_in_memory(self):
        path = str(self._path)
        return path.startswith(':memory:')

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
            cur = cur.execute(f'SELECT * FROM "{metric}" {cond}')
            res = cur.fetchall()
        except sqlite3.OperationalError:
            logger.warning(f'Specified metric/exp_id does not exist: <{metric}, {exp_id}>')
            res = []

        return res

    # -------------
    # -- Writing --
    # -------------
    def write_many(self, points: dict[str, dict[int, Point]]):
        cur = self._con.cursor()
        sql_d = {}
        for m, sub in points.items():
            sql_d[m] = [
                SqlPoint(p.frame, p.exp_id, p.data) for p in sub.values()
            ]

        for m in sql_d:
            self._setup_table(cur, m)
            self._write_many(cur, m, sql_d[m])

        self._con.commit()

    def _write_many(self, cur: sqlite3.Cursor, m: str, d: list[SqlPoint]):
        cur.executemany(f'INSERT INTO "{m}" (frame, id, measurement) VALUES (?,?,?)', d)

    def merge(self, other: str):
        with filelock.FileLock(f'{other}.lock'):
            other_con = sqlite3.connect(other)

            cur = self._con.cursor()
            other_cur = other_con.cursor()
            tables = sqlu.get_tables(cur)
            other_tables = sqlu.get_tables(other_cur)

            to_build = tables - other_tables
            for table in to_build:
                other_cur.execute(f'CREATE TABLE "{table}"(frame, id, measurement)')

            other_con.close()

            cur.execute(f'ATTACH DATABASE "{other}" AS other_db')
            for table in tables:
                cur.execute(f'INSERT INTO other_db.{table} SELECT * FROM {table}')

            self._con.commit()
            cur.execute('DETACH DATABASE other_db')
            cur.close()

    # ---------------
    # -- Lifecycle --
    # ---------------

    def dump(self) -> str:
        self._con.row_factory = None
        return ''.join(self._con.iterdump())

    def load(self, data: Any):
        self._con.executescript(data)
        self._con.commit()
        self.init_db()

    def close(self):
        self._con.close()


    def __getstate__(self) -> object:
        return {
            'path': str(self._path),
        }

    def __setstate__(self, state: dict[str, Any]):
        self._path = Path(state['path'])
        self._con = sqlite3.connect(self._path, check_same_thread=False)
        self._con.row_factory = row_factory
        self._built = set[str]()


def row_factory(cur, d):
    return SqlPoint(*d)
