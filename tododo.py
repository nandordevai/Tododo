import os

from flask import Flask, render_template, send_from_directory
from bson.json_util import dumps
from pymongo import MongoClient

app = Flask(__name__, static_folder='bower_components', static_url_path='/assets')
app.config.update(DEBUG=True, TESTING=False)

collection = MongoClient('mongodb://localhost:27017/tododo').get_default_database().tasks

@app.route('/', methods=['GET'])
def root():
    return render_template('default.html')

@app.route('/tasks', methods=['GET'])
def list_tasks():
    tasks = collection.find({'completed_on': None})
    return dumps({'tasks': [task for task in tasks]})

@app.route('/assets/js/<path:filename>')
def custom_static(filename):
    return send_from_directory(os.path.join(app.root_path, 'js'), filename)

if __name__ == '__main__':
    app.run()
