from flask import jsonify
from flask_restful import Resource
from models import ItemModel


class ItemList(Resource):
    def get(self):
        # Get all items
        items = ItemModel.query.all()
        return jsonify([item.serialize for item in items])
