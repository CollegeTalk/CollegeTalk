from api.models import UserModel, db
from api.routes.utils import update_fields
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class User(Resource):
    def get(self, id):
        try:
            user = UserModel.query.filter_by(id=id).first()
            return jsonify(user.serialize)
        except RuntimeError:
            return jsonify({"error": f"User {id} not found"})

    def put(self, id):
        try:
            user = db.session.query(UserModel).filter_by(
                id=id).first_or_404()
            data = request.json
            update_fields(user, data)
            db.session.commit()
            return jsonify(user.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error updating {id}"})

    def delete(self, id):
        try:
            user = db.session.query(UserModel).filter_by(
                id=id).first_or_404()
            db.session.delete(user)
            db.session.commit()
            return jsonify(user.serialize)
        except RuntimeError:
            return jsonify({'error': f'Error deleting {id}'})


api.add_resource(User, "/users/<string:id>")
