import os

from flask import Flask, render_template, send_from_directory
from bson.json_util import dumps
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

app = Flask(__name__, static_folder='bower_components', static_url_path='/assets')
app.config.update(DEBUG=True, TESTING=False)
env = os.getenv('FLASK_ENV', 'dev')

try:
	collection = MongoClient('mongodb://localhost:27017/tododo_{}'.format(env)).get_default_database().tasks
except ConnectionFailure:
	print('Could not connect to MongoDB')
	os._exit(1)

@app.route('/', methods=['GET'])
def root():
    return render_template('default.html')

@app.route('/tasks', methods=['GET'])
def list_tasks():
    tasks = collection.find({'completed_on': None})
    return dumps({'tasks': [task for task in tasks]})

@app.route('/archived', methods=['GET'])
def list_archived():
    tasks = collection.find({'completed_on': {'$ne': None}})
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

if __name__ == '__main__':
    app.run()
