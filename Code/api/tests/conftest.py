"""
pytest fixture setup
"""
import time

import pytest
import testing.postgresql
from api import create_app


@pytest.fixture(scope="session")
def postgres():
    with testing.postgresql.Postgresql() as postgresql:
        yield postgresql


@pytest.fixture(scope="session")
def client(postgres):
    test_config = {
        "SQLALCHEMY_DATABASE_URI": postgres.url(),
        "DEBUG": True,
        "SQLALCHEMY_TRACK_MODIFICATIONS": False,
    }
    app = create_app(test_config)
    app.app_context().push()

    time.sleep(2)
    from api.models import db

    db.create_all()

    client = app.test_client()

    yield client
