from flask import Flask
from bson.json_util import dumps
from pymongo import MongoClient

app = Flask(__name__)
app.config.update(DEBUG=False, TESTING=False)

collection = MongoClient('mongodb://localhost:27017/tododo').get_default_database().tasks

@app.route("/tasks", methods=['GET'])
def list_tasks():
    tasks = collection.find({'completed_on': None})
    return dumps({'tasks': [task for task in tasks]})

if __name__ == "__main__":
    app.run()
    