from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/tasks", methods=['GET'])
def list_tasks():
    return jsonify({'tasks': []})

if __name__ == "__main__":
    app.run()