from flask import Flask, request, jsonify
from pathlib import Path
import json

app = Flask(__name__)

BASE = Path(__file__).parent

FILE = BASE / "messages.json"

def load_messages():
    if FILE.exists():
        with open(FILE, "r") as file:
            return json.load(file)
    return []

def save_messages(messages):
    with open(FILE, "w") as file:
        json.dump(messages, file, indent=2)

@app.route('/messages', methods=["GET"])
def get_messages():
    messages = load_messages()
    return jsonify(messages), 200, {"Access-Control-Allow-Origin":"*"} 

@app.route('/messages', methods=["POST"])
def post_message():
    data = request.form
    if not data or "name" not in data or "message" not in data or "image" not in data:
        return "Invalid Request", 400, {"Access-Control-Allow-Origin":"*"}
    messages = load_messages()
    messages.append({"name" : data['name'], "message" : data['message'], "image" : data['image']})
    save_messages(messages)
    return "Created", 201, {"Access-Control-Allow-Origin":"*"} 


def main():
    app.run(debug=True)

if __name__ == "__main__":
    main()