import os
from datetime import datetime
from time import mktime

from flask import Flask, render_template, send_from_directory, request, abort
from bson.json_util import dumps
from bson.objectid import ObjectId
from pymongo import MongoClient, DESCENDING
from pymongo.errors import ConnectionFailure
import bleach
import parsedatetime

app = Flask(__name__, static_folder='bower_components', static_url_path='/assets')
app.config.update(DEBUG=True, TESTING=False)
env = os.getenv('FLASK_ENV', 'test')

try:
    if env in ('dev', 'test'):
        mongourl = 'mongodb://localhost:27017/tododo_{}'.format(env)
    else:
        mongourl = os.getenv('MONGOHQ_URL')
    collection = MongoClient(mongourl).get_default_database().tasks
except ConnectionFailure:
    print('Could not connect to MongoDB')
    os._exit(1)

def parse(jsondata):
    def parse_date(text):
        cal = parsedatetime.Calendar()
        date = cal.parse(text)
        if date[0] == 0:
            return None
        due_date = datetime.fromtimestamp(mktime(date[0]))
        if due_date > datetime.now():
            return due_date
        else:
            return None

    if (jsondata is None
        or 'text' not in jsondata.keys()
        or jsondata['text'] in (None, '')):
        return None
    text = bleach.clean(jsondata['text'], tags=[], strip=True)
    tags = [word[1:] for word in text.split() if len(word) > 1 and word[0] == '#']
    task = {'text': text, 'tags': tags, 'due_on': parse_date(text)}
    return task

@app.route('/', methods=['GET'])
def root():
    return render_template('default.html')

@app.route('/tasks', methods=['GET'])
def list_tasks():
    tasks = collection.find({'completed_on': None})
    return dumps({'tasks': [task for task in tasks]})

@app.route('/closed', methods=['GET'])
def list_closed():
    tasks = collection.find({'completed_on': {'$ne': None}}).sort('completed_on', DESCENDING)
    return dumps({'tasks': [task for task in tasks]})

@app.route('/assets/js/<path:filename>')
def send_js(filename):
    return send_from_directory(os.path.join(app.root_path, 'js'), filename)

@app.route('/assets/css/<path:filename>')
def send_css(filename):
    return send_from_directory(os.path.join(app.root_path, 'css'), filename)

@app.route('/templates/<path:filename>')
def send_template(filename):
    return send_from_directory(os.path.join(app.root_path, 'templates'), filename)

@app.route('/tasks', methods=['PUT'])
def add_task():
    task = parse(request.get_json())
    if task is None:
        abort(400)
    task_id = collection.insert(task)
    task = collection.find_one({'_id': task_id})
    return dumps({'task': task})

@app.route('/tasks/<task_id>/close', methods=['POST'])
def close_task(task_id):
    try:
        completed = request.get_json()['completed']
    except:
        abort(400)
    update = {'$set': {'completed_on': datetime.now()}} if completed else {'$unset': {'completed_on': ''}}
    result = collection.update({'_id': ObjectId(task_id)}, update, upsert=False)
    if result['n'] == 0:
        abort(404)
    return dumps({'success': True})

@app.route('/tasks/<task_id>/update', methods=['POST'])
def update_task(task_id):
    task = parse(request.get_json())
    if task is None:
        abort(400)
    result = collection.update({'_id': ObjectId(task_id)}, {'$set': {'text': task['text'], 'tags': task['tags']}}, upsert=False)
    if result['n'] == 0:
        abort(404)
    return dumps({'success': True})

@app.route('/tags/<tag>', methods=['GET'])
def list_tasks_by_tag(tag):
    tasks = collection.find({'tags': {'$in': [tag]}, 'completed_on': None})
    return dumps({'tasks': [task for task in tasks]})

if __name__ == '__main__':
    app.run(host='0.0.0.0')
