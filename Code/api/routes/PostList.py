from uuid import uuid4
from flask import jsonify, request
from flask_restful import Resource
from models import PostsModel, db


class PostList(Resource):
    def get(self):
        # get a limited number of posts, newest to oldest
        # curl http://localhost:5000/posts?limit=1 -H 'Content-Type: application/json'
        # get all posts, newest to oldest
        # curl http://localhost:5000/posts -H 'Content-Type: application/json'
        limit = request.args.get("limit")
        if limit != None and limit.isnumeric() and int(limit) >= 0:
            posts = PostsModel.query.order_by(PostsModel.time_created.desc()).limit(int(limit))
            return jsonify([post.serialize for post in posts])
        else:
            posts = PostsModel.query.order_by(PostsModel.time_created.desc())
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
