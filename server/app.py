from flask import Flask, request, jsonify
from dbmanager import DBManager

app = Flask(__name__)

@app.route('/messages/<int:message_id>', methods=["OPTIONS"])
def do_preflight(message_id):
    return '', 204, {
                        "Access-Control-Allow-Origin":"*",
                        "Access-Control-Allow-Methods":"GET, PUT, DELETE",
                        "Access-Control-Allow-Headers":"Content-Type"
                    }


@app.route('/messages', methods=["GET"])
def get_messages():
    with DBManager("serverdb.db") as db:
        messages = db.get_all_entries()
        return jsonify(messages), 200, {"Access-Control-Allow-Origin":"*"} 

@app.route('/messages/<int:message_id>', methods=["GET"])
def get_message(message_id):
    with DBManager("serverdb.db") as db:
        message = db.retrieve_entry(message_id)
        if message is None:
            return "error: message not found", 404, {"Access-Control-Allow-Origin":"*"}  
        return jsonify(message), 200, {"Access-Control-Allow-Origin":"*"} 
    
@app.route('/messages/<int:message_id>', methods=["DELETE"])
def delete_message(message_id):
    with DBManager("serverdb.db") as db:
        if db.retrieve_entry(message_id) is None:
            return "error: message not found", 404, {"Access-Control-Allow-Origin":"*"}  
        db.delete_entry(message_id)
        return '', 204, {"Access-Control-Allow-Origin":"*"} 

@app.route('/messages/<int:message_id>', methods=["PUT"])
def update_message(message_id):
    data = request.form
    if (
        not data
        or "name" not in data
        or "message" not in data
        or "image" not in data
        ):
        return "error: invalid request", 400, {"Access-Control-Allow-Origin":"*"}  
    with DBManager("serverdb.db") as db:
        if db.retrieve_entry(message_id) is None:
            return "error: message not found", 404, {"Access-Control-Allow-Origin":"*"}  
        db.update_entry(message_id, data)
        return '', 204, {"Access-Control-Allow-Origin":"*"} 


@app.route('/messages', methods=["POST"])
def post_message():
    data = request.form
    if not data or "name" not in data or "message" not in data or "image" not in data:
        return "Invalid Request", 400, {"Access-Control-Allow-Origin":"*"}
    with DBManager("serverdb.db") as db:
        db.new_entry(data)
    return "Created", 201, {"Access-Control-Allow-Origin":"*"} 

@app.errorhandler(404)
def not_found(e):
    return "error: Endpoint not found", 404, {"Access-Control-Allow-Origin": "*"}




def main():
    app.run(debug=True)

if __name__ == "__main__":
    main()