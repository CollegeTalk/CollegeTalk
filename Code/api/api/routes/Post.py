from api.models import db, UserModel, PostModel
from api.routes.utils import update_fields
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Post(Resource):
    def get(self, id):
        try:
            post = PostModel.query.filter_by(id=id).first()
            post_data = post.serialize
        
            user_id = post_data["author_id"]
            post_data["author_username"] = UserModel.query.filter_by(id=user_id).first().username

            return jsonify(post_data)
        except RuntimeError:
            return jsonify({"error": f"Post {id} not found"})

    def put(self, id):
        try:
            post = db.session.query(PostModel).filter_by(id=id).first_or_404()
            data = request.json
            update_fields(post, data)
            db.session.commit()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error updating {id}"})

    def delete(self, id):
        try:
            post = db.session.query(PostModel).filter_by(id=id).first_or_404()
            db.session.delete(post)
            db.session.commit()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error deleting {id}"})


api.add_resource(Post, "/posts/<string:id>")
