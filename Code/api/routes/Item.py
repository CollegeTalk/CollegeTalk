from flask import jsonify, request
from flask_restful import Resource
from models import ItemsModel, db


class Item(Resource):
    def get(self, item_name):
        # curl http://localhost:5000/items/{item_name}
        try:
            item = ItemsModel.query.filter_by(key=item_name).first_or_404()
            return jsonify(item.serialize)
        except:
            return jsonify({"error": f"Item {item_name} not found"})

    def put(self, item_name):
        # curl http://localhost:5000/items/{item_name} -H 'Content-Type: application/json' -d '{"value":"Hello"}' -X PUT
        try:
            item = db.session.query(ItemsModel).filter_by(
                key=item_name).first()
            if item:
                item.value = request.json["value"]
                db.session.commit()
            else:
                item = ItemsModel(item_name, request.json["value"])
                db.session.add(item)
                db.session.commit()
            return jsonify(item.serialize)
        except:
            return jsonify({"error": f"Error adding/updating {item_name}"})
