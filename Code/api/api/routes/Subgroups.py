from api.models import SubgroupModel, db
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Subgroups(Resource):
    def get(self):
        # get all subgroups
        subgroups = SubgroupModel.query.all()
        return jsonify([subgroup.serialize for subgroup in subgroups])

    def post(self):
        # post new subgroup
        try:
            data = request.json
            subgroup = SubgroupModel(data["name"], data["description"])
            db.session.add(subgroup)
            db.session.commit()
            return jsonify(subgroup.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error adding {id}"})


api.add_resource(Subgroups, "/subgroups")
