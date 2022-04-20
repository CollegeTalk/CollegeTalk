from api.models import ItemModel
from flask import jsonify
from flask_restful import Resource

from .base import api


class Items(Resource):
    def get(self):
        # Get all items
        items = ItemModel.query.all()
        return jsonify([item.serialize for item in items])


api.add_resource(Items, '/items')
