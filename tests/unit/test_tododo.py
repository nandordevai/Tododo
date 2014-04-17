from datetime import datetime

from bson.json_util import loads, dumps
from bson.objectid import ObjectId
import pytest
from pymongo import MongoClient

import tododo

class TestTododo:

    @classmethod
    @pytest.fixture(scope = "class", autouse = True)
    def setup(self):
        self.oids = {
            'first': ObjectId(),
            'second': ObjectId(),
            'archived': ObjectId()
        }

    @pytest.fixture(autouse=True)
    def restore_db(self, request):
        collection = MongoClient('mongodb://localhost:27017/tododo_test').get_default_database().tasks
        collection.remove()
        collection.insert([
            {
                '_id': self.oids['first'],
                'text': 'First active item'
            },
            {
                '_id': self.oids['second'],
                'text': 'Second active item'
            },
            {
                '_id': self.oids['archived'],
                'text': 'Archived item',
                'completed_on': datetime.now().isoformat()
            }
        ])

    def test_tasklist_should_return_list(self, app):
        response = app.get('/tasks')
        assert isinstance(loads(response.data.decode('utf-8'))['tasks'], list)
    
    def test_tasklist_should_not_return_archived_tasks(self, app):
        response = app.get('/tasks')
        tasks = loads(response.data.decode('utf-8'))['tasks']
        assert len([task for task in tasks if 'completed_on' in task.keys() and task['completed_on'] is not None]) == 0

    def test_root_should_render_default_template(self, app):
        response = app.get('/')
        assert response.data.decode('utf-8').startswith('<!DOCTYPE html>')

    def test_archivelist_should_return_archived_tasks(self, app):
        response = app.get('/archived')
        tasks = loads(response.data.decode('utf-8'))['tasks']
        assert len([task for task in tasks if 'completed_on' in task.keys() and task['completed_on'] is None]) == 0

    def test_should_send_js_file(self, app):
        response = app.get('/assets/js/app.js')
        assert response.status_code == 200

    def test_should_send_template(self, app):
        response = app.get('/templates/active.html')
        assert response.status_code == 200

    def test_should_send_css_file(self, app):
        response = app.get('/assets/css/tododo.css')
        assert response.status_code == 200

    def test_should_add_task(self, app):
        response = app.put('/tasks', data=dumps(dict(task='New task')), content_type='application/json')
        task = loads(response.data.decode('utf-8'))['task']
        assert task['text'] == 'New task'

    def test_should_not_add_empty_task(self, app):
        response = app.put('/tasks', data=dumps(dict(task='')), content_type='application/json')
        assert response.status_code == 400

    def test_should_close_task(self, app):
        response = app.post('/tasks/{}/close'.format(str(self.oids['first'])), 
            data=dumps(dict(completed=True)), content_type='application/json')
        assert response.status_code == 200
        response = app.get('/tasks')
        tasks = loads(response.data.decode('utf-8'))['tasks']
        assert len(tasks) == 1

    def test_should_reopen_task(self, app):
        response = app.post('/tasks/{}/close'.format(str(self.oids['archived'])), 
            data=dumps(dict(completed=False)), content_type='application/json')
        assert response.status_code == 200
        response = app.get('/tasks')
        tasks = loads(response.data.decode('utf-8'))['tasks']
        assert len(tasks) == 3

    def test_close_should_handle_invalid_request(self, app):
        response = app.post('/tasks/{}/close'.format(str(self.oids['first'])))
        assert response.status_code == 400

    def test_close_should_return_404_for_nonexisting_id(self, app):
        response = app.post('/tasks/{}/close'.format(str(ObjectId())), 
            data=dumps(dict(completed=True)), content_type='application/json')
        assert response.status_code == 404

    def test_update_should_handle_invalid_request(self, app):
        response = app.post('/tasks/{}/update'.format(str(self.oids['first'])))
        assert response.status_code == 400

    def test_update_should_return_404_for_nonexisting_id(self, app):
        response = app.post('/tasks/{}/update'.format(str(ObjectId())), 
            data=dumps(dict(text=True)), content_type='application/json')
        assert response.status_code == 404
    
    def test_should_update_task_text(self, app):
        response = app.post('/tasks/{}/update'.format(str(self.oids['first'])),
            data=dumps(dict(text='Updated text')), content_type='application/json')
        assert response.status_code == 200
        response = app.get('/tasks')
        tasks = loads(response.data.decode('utf-8'))['tasks']
        assert tasks[0]['text'] == 'Updated text'

    def test_should_not_update_to_empty_text(self, app):
        response = app.post('/tasks/{}/update'.format(str(self.oids['first'])),
            data=dumps(dict(text='')), content_type='application/json')
        assert response.status_code == 400
        