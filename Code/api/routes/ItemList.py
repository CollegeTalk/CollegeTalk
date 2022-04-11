from flask import jsonify
from flask_restful import Resource
from models import ItemsModel


class ItemList(Resource):
    def get(self):
        # Get all items
        items = ItemsModel.query.all()
        return jsonify([item.serialize for item in items])
