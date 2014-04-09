import pytest

import tododo

@pytest.fixture
def app():
	return tododo.app.test_client()