from flask import jsonify, request
from flask_restful import Resource
from models import db, SubgroupModel


class Subgroups(Resource):
    def get(self):
        # Get all subgroups
        subgroups = SubgroupModel.query.all()
        return jsonify([subgroup.serialize for subgroup in subgroups])

    def post(self):
        # Post new subgroup
        try:
            data = request.json
            subgroup = SubgroupModel(
                data['name'],
                data['description']
            )
            db.session.add(subgroup)
            db.session.commit()
            return jsonify(subgroup.serialize)
        except RuntimeError:
            return jsonify({'error': f'Error adding {id}'})
