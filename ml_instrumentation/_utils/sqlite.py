from collections.abc import Iterable
from typing import Any
from sqlite3 import Cursor


def get_tables(cur: Cursor) -> set[str]:
    cur.row_factory = None
    res = cur.execute("SELECT name FROM sqlite_master")
    return set(r[0] for r in res.fetchall())


def make_table(cur: Cursor, name: str, columns: Iterable[str]):
    cols = ', '.join(map(quote, columns))
    cur.execute(f'CREATE TABLE {name}({cols})')


def maybe_make_table(cur: Cursor, name: str, columns: Iterable[str]):
    tables = get_tables(cur)

    if name not in tables:
        make_table(cur, name, columns)


def get_cols(cur: Cursor, name: str):
    res = cur.execute(f'PRAGMA table_info({name})')
    rows = res.fetchall()

    return set(r[1] for r in rows)


def add_cols(cur: Cursor, columns: Iterable[str]):
    columns = map(quote, columns)
    for col in columns:
        cur.execute(f'ALTER TABLE results ADD COLUMN {col}')


def ensure_table_compatible(cur: Cursor, name: str, columns: Iterable[str]):
    columns = set(columns)
    current_cols = get_cols(cur, name)
    needed_cols = columns - current_cols

    if needed_cols:
        add_cols(cur, needed_cols)


def maybe_quote(v: Any):
    if isinstance(v, str):
        return quote(v)
    return v

def quote(s: str):
    return f'"{s}"'
