import os

import pytest

import tododo

@pytest.fixture
def app():
    app = tododo.app
    app.config.update(DEBUG=True, TESTING=True)
    return app.test_client()
