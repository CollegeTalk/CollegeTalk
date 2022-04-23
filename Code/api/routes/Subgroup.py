from flask import jsonify, request
from flask_restful import Resource
from models import db, SubgroupModel
from routes.utils import update_fields


class Subgroup(Resource):
    def get(self, id):
        try:
            subgroup = SubgroupModel.query.filter_by(id=id).get_or_404()
            return jsonify(subgroup.serialize)
        except RuntimeError:
            return jsonify({'error': f'Subgroup {id} not found'})

    def put(self, id):
        try:
            subgroup = db.session.query(SubgroupModel).filter_by(
                id=id).get_or_404()
            data = request.json
            update_fields(subgroup, data)
            db.session.commit()
            return jsonify(subgroup.serialize)
        except RuntimeError:
            return jsonify({'error': f'Error adding/updating {id}'})
