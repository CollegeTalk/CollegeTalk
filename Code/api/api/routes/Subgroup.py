from api.models import SubgroupModel, db
from api.routes.utils import update_fields
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Subgroup(Resource):
    def get(self, id):
        try:
            subgroup = SubgroupModel.query.filter_by(id=id).first()
            return jsonify(subgroup.serialize)
        except RuntimeError:
            return jsonify({"error": f"Subgroup {id} not found"})

    def put(self, id):
        try:
            subgroup = db.session.query(SubgroupModel).filter_by(
                id=id).first_or_404()
            data = request.json
            update_fields(subgroup, data)
            db.session.commit()
            return jsonify(subgroup.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error updating {id}"})

    # TODO: implement feature to grab top upvoted posts


api.add_resource(Subgroup, "/subgroups/<string:id>")
