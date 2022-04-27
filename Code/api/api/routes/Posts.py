from api.models import PostModel, db
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Posts(Resource):
    def get(self):
        # get a limited number of posts, newest to oldest
        limit = request.args.get("limit")
        posts = None
        if limit != None and limit.isnumeric() and int(limit) >= 0:
            posts = PostModel.query.order_by(PostModel.time_created.desc()).limit(
                int(limit)
            )
        # get all posts, newest to oldest
        else:
            posts = PostModel.query.order_by(PostModel.time_created.desc())
        return jsonify([post.serialize for post in posts])

    def post(self):
        # post new post
        try:
            data = request.json
            post = PostModel(
                data["author_id"], data["title"], data["body"], data["subgroup_id"]
            )
            db.session.add(post)
            db.session.commit()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error adding {id}"})


api.add_resource(Posts, "/posts")
