import os

from flask import Flask, jsonify, request
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

hello_world = {}


class Home(Resource):
    def get(self):
        return "Hello World!"


class HelloWorld(Resource):
    def get(self, id):
        # curl http://localhost:5000/{id}
        return jsonify({"hello_world": hello_world[id]})

    def put(self, id):
        # curl http://localhost:5000/{id} -d "data=Hello World" -X PUT
        hello_world[id] = request.form["data"]
        return jsonify({"hello_world": hello_world[id]})


api.add_resource(Home, "/")
api.add_resource(HelloWorld, "/<string:id>")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
