from api.models import CommentModel, db
from api.routes.utils import update_fields
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Comment(Resource):
    def get(self, id):
        try:
            comment = CommentModel.query.filter_by(id=id).first()
            return jsonify(comment.serialize)
        except RuntimeError:
            return jsonify({"error": f"Comment {id} not found"})

    def put(self, id):
        try:
            comment = db.session.query(CommentModel).filter_by(
                id=id).first_or_404()
            data = request.json
            update_fields(comment, data)
            db.session.commit()
            return jsonify(comment.serialize)
        except RuntimeError:
            return jsonify({'error': f'Error updating {id}'})


api.add_resource(Comment, "/comments/<string:id>")
