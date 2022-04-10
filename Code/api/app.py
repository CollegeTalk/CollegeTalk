import os

from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy

from models import ItemsModel, PostsModel

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


class PostsList(Resource):
    def get(self):
        # Get all items
        posts = PostsModel.query.all()
        return jsonify([post.serialize for post in posts])


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
                item.value = request.json["value"]
                db.session.commit()
            else:
                item = ItemsModel(item_name, request.json["value"])
                db.session.add(item)
                db.session.commit()
            return jsonify(item.serialize)
        except:
            return jsonify({"error": f"Error adding/updating {item_name}"})


class Posts(Resource):
    def get(self, id):
        # curl http://localhost:5000/posts/{id}
        try:
            post = PostsModel.query.filter_by(key=id).first_or_404()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({"error": f"Post {id} not found"})

    def put(self, id):
        # curl http://localhost:5000/posts/{id} -H 'Content-Type: application/json' -d '{"title":"test", "body":"blah blah blah"}' -X PUT
        try:
            post = db.session.query(PostsModel).filter_by(
                id=id).first()
            data = request.json
            print(request.json)
            for key, value in data.items():
                print(key, value)
            print(data["title"], ' ', data["body"])
            if post:
                post.title = data["title"]
                post.body = data["body"]
                db.session.commit()
            else:
                post = PostsModel(id, db.func.now(),
                                  data["title"], data["body"])
                db.session.add(post)
                db.session.commit()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error adding/updating {id}"})


api.add_resource(Home, "/")
api.add_resource(ItemList, "/items")
api.add_resource(Item, "/items/<string:item_name>")
api.add_resource(PostsList, "/posts")
api.add_resource(Posts, "/posts/<int:id>")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
