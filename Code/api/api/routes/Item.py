from api.models import ItemModel, db
from api.routes.utils import update_fields
from flask import jsonify, request
from flask_restful import Resource

from .base import api


class Item(Resource):
    def get(self, item_name):
        # curl http://localhost:5000/items/{item_name}
        try:
            item = ItemModel.query.filter_by(key=item_name).get_or_404()
            return jsonify(item.serialize)
        except RuntimeError:
            return jsonify({"error": f"Item {item_name} not found"})

    def put(self, item_name):
        # curl http://localhost:5000/items/{item_name} -H 'Content-Type: application/json' -d '{"value":"Hello"}' -X PUT
        try:
            item = db.session.query(ItemModel).filter_by(key=item_name).get_or_404()
            data = request.json
            update_fields(item, data)
            db.session.commit()
            return jsonify(item.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error adding/updating {item_name}"})


api.add_resource(Item, "/items/<string:item_name>")
