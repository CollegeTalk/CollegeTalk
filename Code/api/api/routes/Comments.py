from api.models import db, UserModel, CommentModel
from .utils import update_relationship
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Comments(Resource):
    def get(self):
        # get all comments
        post_id = request.args.get("post_id")
        comments = CommentModel.query.filter_by(post_id=post_id).order_by(CommentModel.helpful_answer.desc(),
                                                                          CommentModel.num_upvotes.desc())
        return jsonify([comment.serialize for comment in comments])

    def post(self):
        # post new comment
        try:
            data = request.json
            comment = CommentModel(
                data["author_id"], data["body"], data["post_id"]
            )
            db.session.add(comment)
            db.session.commit()
            return jsonify(comment.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error adding {id}"})

    def put(self):
        # update comments (for upvotes)
        try:
            data = request.json
            user = db.session.query(UserModel).filter_by(id=data["user_id"]).first_or_404()
            update_relationship(CommentModel, user, data)
            db.session.commit()
            return jsonify({ "user_id": data["user_id"], "comments": [post_id for post_id in data["objs"]] })
        except RuntimeError:
            return jsonify({"error": f"Error updating {id}"})


api.add_resource(Comments, "/comments")
