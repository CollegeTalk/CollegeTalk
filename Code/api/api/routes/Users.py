from api.models import UserModel, db
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Users(Resource):
    def get(self):
        # get all users
        users = UserModel.query.all()
        return jsonify([user.serialize for user in users])

    def post(self):
        # post new user
        try:
            data = request.json
            user = UserModel(
                data["name"], data.get("username", "")
            )
            db.session.add(user)
            db.session.commit()
            return jsonify(user.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error adding {id}"})


api.add_resource(Users, "/users")
