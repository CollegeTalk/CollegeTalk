from flask import jsonify, request
from flask_restful import Resource
from models import db, ItemModel
from routes.utils import update_fields


class Item(Resource):
    def get(self, item_name):
        # curl http://localhost:5000/items/{item_name}
        try:
            item = ItemModel.query.filter_by(key=item_name).first_or_404()
            return jsonify(item.serialize)
        except RuntimeError:
            return jsonify({'error': f'Item {item_name} not found'})

    def put(self, item_name):
        # curl http://localhost:5000/items/{item_name} -H 'Content-Type: application/json' -d '{'value':'Hello'}' -X PUT
        try:
            item = db.session.query(ItemModel).filter_by(
                key=item_name).first()
            data = request.json
            if item:
                update_fields(item, data)
            else:
                item = ItemModel(item_name, request.json['value'])
                db.session.add(item)
            db.session.commit()
            return jsonify(item.serialize)
        except RuntimeError:
            return jsonify({'error': f'Error adding/updating {item_name}'})
