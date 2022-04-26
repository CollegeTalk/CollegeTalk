from api.models import PostModel, db
from api.routes.utils import update_fields
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Post(Resource):
    def get(self, id):
        try:
            post = PostModel.query.filter_by(id=id).first()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({"error": f"Post {id} not found"})

    def put(self, id):
        try:
            post = db.session.query(PostModel).filter_by(
                id=id).first_or_404()
            data = request.json
            update_fields(post, data)
            db.session.commit()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({'error': f'Error updating {id}'})


api.add_resource(Post, "/posts/<string:id>")
