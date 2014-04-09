from flask import json
import pytest

import tododo

class TestTododo:

	def test_tasklist_should_return_list(self, app):
		response = app.get('/tasks')
		assert isinstance(json.loads(response.data)['tasks'], list)
		