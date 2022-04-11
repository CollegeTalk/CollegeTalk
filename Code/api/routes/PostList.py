from uuid import uuid4
from flask import jsonify, request
from flask_restful import Resource
from models import PostsModel, db


class PostList(Resource):
    def get(self):
        # Get all items
        posts = PostsModel.query.all()
        return jsonify([post.serialize for post in posts])

    def post(self):
        # Post new item
        # curl http://localhost:5000/posts -H 'Content-Type: application/json' -d '{"title":"test", "body":"blah blah blah"}' -X POST
        try:
            data = request.json
            post = PostsModel(uuid4(), db.func.now(),
                              data["title"], data["body"])
            db.session.add(post)
            db.session.commit()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error adding {id}"})
