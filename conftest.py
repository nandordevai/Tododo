import pytest

import tododo

@pytest.fixture
def app():
	app = tododo.app
	app.config.update(DEBUG=True, TESTING=True, DB_URI='mongodb://localhost:27017/tododo_test')
	return app.test_client()
