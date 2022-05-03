from api.models import db, UserModel, PostModel
from .utils import update_relationship
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
        
        result = [post.serialize for post in posts]
        
        fetch_author_username = lambda id: UserModel.query.filter_by(id=id).first().username
        for post_data in result:
            post_data["author_username"] = fetch_author_username(post_data["author_id"])

        return jsonify(result)

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

    def put(self):
        # update posts (for upvotes)
        try:
            data = request.json
            user = db.session.query(UserModel).filter_by(id=data["user_id"]).first_or_404()
            update_relationship(PostModel, user, data)
            db.session.commit()
            return jsonify({ "user_id": data["user_id"], "posts": [post.id for post in user.upvoted_posts] })
        except RuntimeError:
            return jsonify({"error": f"Error updating {id}"})


api.add_resource(Posts, "/posts")
