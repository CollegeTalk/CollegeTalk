import os

from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from sqlalchemy_utils import create_database, database_exists

from config import config
from models import db
from routes import Index, Items, Item, Posts, Post, Subgroups, Subgroup

app = Flask(__name__)
api = Api(app)

env = os.environ.get('FLASK_ENV', 'development')
app.config.from_object(config[env])

if env != 'production':
    db_url = app.config['SQLALCHEMY_DATABASE_URI']
    if not database_exists(db_url):
        create_database(db_url)

db.init_app(app)

if env != 'production':
    with app.app_context():
        db.create_all()

migrate = Migrate(app, db)

api.add_resource(Index, '/')
api.add_resource(Items, '/items')
api.add_resource(Item, '/items/<string:item_name>')
api.add_resource(Posts, '/posts')
api.add_resource(Post, '/posts/<string:id>')
api.add_resource(Subgroups, '/subgroups')
api.add_resource(Subgroup, '/subgroups/<string:id>')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
