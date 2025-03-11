from collections.abc import Iterable
from functools import reduce
from pathlib import Path
from typing import Any
import connectorx as cx
import sqlite3

import ml_instrumentation._utils.sqlite as sqlu


def read_to_df(db_path: str | Path, metric: str, ids: Iterable[int] | None = None):
    db_path = Path(db_path)

    constraints = ''
    if ids is not None:
        str_ids = map(str, map(sqlu.maybe_quote, ids))
        constraints = f'WHERE id IN ({",".join(str_ids)})'

    query = f'SELECT * FROM {metric} {constraints}'
    df = cx.read_sql(f'sqlite://{db_path}', query, partition_on='id', partition_num=4, return_type='polars')
    df = df.lazy()
    df = df.rename({'measurement': metric})
    return df


def read_metrics(db_path: str | Path, metrics: Iterable[str], ids: Iterable[int] | None = None):
    dfs = [read_to_df(db_path, metric, ids) for metric in metrics]
    df = reduce(lambda df1, df2: df1.join(df2, how='full', on=['id', 'frame'], coalesce=True), dfs)
    df = df.sort('frame')
    return df


def load_all_results(db_path: str | Path, metrics: Iterable[str] | None = None, ids: Iterable[int] | None = None):
    con = sqlite3.connect(db_path)
    cur = con.cursor()

    tables = sqlu.get_tables(cur)
    if metrics is None:
        metrics = tables - {'_metadata_'}

    df = read_metrics(db_path, metrics, ids)

    if '_metadata_' not in tables:
        return df.collect()

    meta = cx.read_sql(f'sqlite://{db_path}', 'SELECT * FROM _metadata_', return_type='polars')
    meta = meta.lazy()
    return df.join(meta, how='left', on=['id']).collect()


def get_run_ids(db_path: str | Path, params: dict[str, Any]):
    constraints = ' AND '.join(
        f'[{k}]={sqlu.maybe_quote(v)}' for k, v in params.items()
    )

    query = f'SELECT id FROM _metadata_ WHERE {constraints}'
    return cx.read_sql(f'sqlite://{db_path}', query, return_type='polars')['id'].to_list()
