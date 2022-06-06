from flask import Flask, render_template, url_for, request, jsonify, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/request', methods=['GET', 'POST', 'PUT', 'DELETE'])
def request_counter():
    if request.method == 'POST':
        post_request = int(request.get_json()['POST'])
        post_request += 1
        return jsonify({'POST': post_request})
    elif request.method == 'PUT':
        put_request = int(request.get_json()['PUT'])
        put_request += 1
        return jsonify({'PUT': put_request})
    elif request.method == 'DELETE':
        delete_request = int(request.get_json()['DELETE'])
        delete_request += 1
        return jsonify({'DELETE': delete_request})
    else:
        return jsonify({'GET': 1})


if __name__ == '__main__':
    app.run()
