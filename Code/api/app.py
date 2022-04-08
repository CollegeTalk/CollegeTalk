import os

from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy

from models import ItemsModel

app = Flask(__name__)
api = Api(app)

# Database config
host = os.environ["POSTGRES_HOST"]
port = os.environ["POSTGRES_PORT"]
username = os.environ["POSTGRES_USER"]
password = os.environ["POSTGRES_PASS"]
database = os.environ["POSTGRES_DB"]

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"postgresql://{username}:{password}@{host}:{port}/{database}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Home(Resource):
    def get(self):
        return "Hello World! Go to /items to see a list of items, make PUT requests to /items/<key> to add or update an item."


class ItemList(Resource):
    def get(self):
        # Get all items
        items = ItemsModel.query.all()
        return jsonify([item.serialize for item in items])


class Item(Resource):
    def get(self, item_name):
        # curl http://localhost:5000/items/{item_name}
        try:
            item = ItemsModel.query.filter_by(key=item_name).first_or_404()
            return jsonify(item.serialize)
        except:
            return jsonify({"error": f"Item {item_name} not found"})

    def put(self, item_name):
        # curl http://localhost:5000/items/{item_name} -H 'Content-Type: application/json' -d '{"value":"Hello"}' -X PUT
        try:
            item = db.session.query(ItemsModel).filter_by(
                key=item_name).first()
            if item:
                print(item.key, item.value, request.json["value"])
                item.value = request.json["value"]
                print(item.key, item.value, request.json["value"])
                db.session.commit()
            else:
                item = ItemsModel(item_name, request.json["value"])
                db.session.add(item)
                db.session.commit()
            return jsonify(item.serialize)
        except:
            return jsonify({"error": f"Error adding/updating {item_name}"})


api.add_resource(Home, "/")
api.add_resource(ItemList, "/items")
api.add_resource(Item, "/items/<string:item_name>")

if __name__ == "__main__":
    app.run(debug=True)
