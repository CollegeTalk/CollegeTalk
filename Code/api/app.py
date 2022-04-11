import os

from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from sqlalchemy_utils import create_database, database_exists

from config import config
from models import db
from routes import Home, Item, ItemList, Post, PostList

app = Flask(__name__)
api = Api(app)

env = os.environ.get("FLASK_ENV", "development")
app.config.from_object(config[env])

if env != "production":
    db_url = app.config["SQLALCHEMY_DATABASE_URI"]
    if not database_exists(db_url):
        create_database(db_url)

db.init_app(app)

if env != "production":
    with app.app_context():
        db.create_all()

migrate = Migrate(app, db)

api.add_resource(Home, "/")
api.add_resource(ItemList, "/items")
api.add_resource(Item, "/items/<string:item_name>")
api.add_resource(PostList, "/posts")
api.add_resource(Post, "/posts/<int:id>")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
