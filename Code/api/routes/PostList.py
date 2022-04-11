from flask import jsonify
from flask_restful import Resource
from models import PostsModel


class PostList(Resource):
    def get(self):
        # Get all items
        posts = PostsModel.query.all()
        return jsonify([post.serialize for post in posts])
