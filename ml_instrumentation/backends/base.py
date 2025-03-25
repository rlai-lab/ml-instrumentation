from typing import Any, NamedTuple

class SqlPoint(NamedTuple):
    frame: int
    id: int | str
    measurement: Any


class Point(NamedTuple):
    exp_id: int | str
    metric: str
    frame: int
    data: Any


class BaseBackend:
    def read_metric(self, metric: str, exp_id: int | str | None = None) -> list[SqlPoint]:
        ...

    def init_db(self) -> None:
        ...

    def dump(self) -> str:
        ...

    def load(self, data: Any) -> None:
        ...

    def close(self) -> None:
        ...

    def get_tables(self) -> set[str]:
        ...

    def merge(self, other: str) -> None:
        ...

    def write_many(self, points: dict[str, dict[int, Point]]) -> None:
        ...
