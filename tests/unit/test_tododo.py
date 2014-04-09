from datetime import datetime

from bson.json_util import loads
import pytest
from pymongo import MongoClient

import tododo

class TestTododo:

    @pytest.fixture(autouse=True)
    def restore_db(self, request):
        collection = MongoClient('mongodb://localhost:27017/tododo').get_default_database().tasks
        collection.remove()
        collection.insert([
            {
                'text': 'First active item'
            },
            {
                'text': 'Second active item'
            },
            {
                'text': 'Archived item',
                'completed_on': datetime.now()
            }
        ])

    def test_tasklist_should_return_list(self, app):
        response = app.get('/tasks')
        assert isinstance(loads(response.data.decode('utf-8'))['tasks'], list)
    
    def test_tasklist_should_not_return_archived_tasks(self, app):
        response = app.get('/tasks')
        tasks = loads(response.data.decode('utf-8'))['tasks']
        assert len([task for task in tasks if 'completed_on' in task.keys() and task['completed_on'] is not None]) == 0
