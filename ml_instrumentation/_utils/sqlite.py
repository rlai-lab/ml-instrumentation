from sqlite3 import Cursor

def get_tables(cur: Cursor) -> set[str]:
    cur.row_factory = None
    res = cur.execute("SELECT name FROM sqlite_master")
    return set(r[0] for r in res.fetchall())
