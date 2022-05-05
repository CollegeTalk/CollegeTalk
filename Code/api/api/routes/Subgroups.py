from .utils import update_relationship
from api.models import db, SubgroupModel, UserModel
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Subgroups(Resource):
    def get(self):
        query = request.args.get("query")
        subgroups = None
        # search for specific subgroups
        if query != None and query.isalnum():
            subgroups = SubgroupModel.query.filter(
                SubgroupModel.name.ilike(f"%{query}%")
            )

        # get all subgroups
        else:
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

    def put(self):
        # update subgroups (for users)
        try:
            data = request.json
            user = (
                db.session.query(UserModel).filter_by(id=data["user_id"]).first_or_404()
            )
            update_relationship(SubgroupModel, user, data)
            db.session.commit()
            return jsonify(
                {
                    "user_id": data["user_id"],
                    "subgroups": [subgroup.id for subgroup in user.subgroups],
                }
            )
        except RuntimeError:
            return jsonify({"error": f"Error updating {id}"})


api.add_resource(Subgroups, "/subgroups")
