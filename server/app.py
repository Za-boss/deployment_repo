from flask import Flask

app = Flask(__name__)

traits = [
    {"name": "something", "rating" : 5, "length" : 5, "painCounter": 5342},
    {"name": "something", "rating" : 5, "length" : 5, "painCounter": 5342},
    {"name": "something", "rating" : 5, "length" : 5, "painCounter": 5342},
    {"name": "something", "rating" : 5, "length" : 5, "painCounter": 5342},
    {"name": "something", "rating" : 5, "length" : 5, "painCounter": 5342}
]

@app.route('/')
def hello_world():
    return traits, {"Access-Control-Allow-Origin":"*"} 

@app.route('/home')
def home():
    return "<h1>welcome to home bozo</h1>"