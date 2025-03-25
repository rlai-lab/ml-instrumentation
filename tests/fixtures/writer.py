import pytest
from ml_instrumentation.Writer import Writer
from ml_instrumentation.backends.sqlite import Sqlite

@pytest.fixture
def writer():
    writer = Writer(
        backend=Sqlite(':memory:'),
        low_watermark=2,
        high_watermark=4,
    )
    yield writer
    writer.close()
