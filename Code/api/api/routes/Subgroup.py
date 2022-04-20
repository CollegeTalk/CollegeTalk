from api.models import SubgroupModel, db
from api.routes.utils import update_fields
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Subgroup(Resource):
    def get(self, id):
        try:
            subgroup = SubgroupModel.query.filter_by(id=id).first_or_404()
            return jsonify(subgroup.serialize)
        except RuntimeError:
            return jsonify({'error': f'Subgroup {id} not found'})

    def put(self, id):
        try:
            subgroup = db.session.query(SubgroupModel).filter_by(
                id=id).first()
            data = request.json
            if subgroup:
                update_fields(subgroup, data)
            else:
                subgroup = SubgroupModel(
                    data['name'],
                    data['description']
                )
                db.session.add(subgroup)
            db.session.commit()
            return jsonify(subgroup.serialize)
        except RuntimeError:
            return jsonify({'error': f'Error adding/updating {id}'})


api.add_resource(Subgroup, '/subgroups/<string:id>')
