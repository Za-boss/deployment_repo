from flask import Flask, request

app = Flask(__name__)

traits = [
    {"name": "something", "rating" : 5, "length" : 5, "painCounter": 5342},
    {"name": "something", "rating" : 5, "length" : 5, "painCounter": 5342},
    {"name": "something", "rating" : 5, "length" : 5, "painCounter": 5342},
    {"name": "something", "rating" : 5, "length" : 5, "painCounter": 5342},
    {"name": "something", "rating" : 5, "length" : 5, "painCounter": 5342}
]

@app.route('/traits', methods=["GET"])
def hello_world():
    return traits, {"Access-Control-Allow-Origin":"*"} 

@app.route('/traits', methods=["POST"])
def addTrait():
    d = {
        'name' : request.form['name'],
        'rating' : request.form['rating'],
        'length' : request.form['length'],
        'painCounter' : request.form['painCounter']
    }
    traits.append(d)
    return "Created", 201, {"Access-Control-Allow-Origin":"*"} 


def main():
    app.run()

if __name__ == "__main__":
    main()