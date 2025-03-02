import sqlite3
from pathlib import Path
from typing import Any

from filelock import FileLock

import ml_instrumentation._utils.sqlite as sqlu

def attach_metadata(db_path: str | Path, id: int | str, metadata: dict[str, Any]):
    db_path = Path(db_path)
    db_path.parent.mkdir(parents=True, exist_ok=True)

    with FileLock(f'{db_path}.lock'):
        con = sqlite3.connect(db_path)
        cur = con.cursor()

        metadata |= {'id': id}
        cols = metadata.keys()
        sqlu.maybe_make_table(cur, '_metadata_', cols)
        sqlu.ensure_table_compatible(cur, '_metadata_', cols)

        inserter = ', '.join(['?'] * len(cols))

        header = ', '.join(map(sqlu.quote, cols))
        query = f'INSERT INTO _metadata_ ({header}) VALUES ({inserter})'
        cur.execute(query, list(metadata.values()))
        con.commit()
        con.close()
