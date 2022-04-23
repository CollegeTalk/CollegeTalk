from flask import jsonify, request
from flask_restful import Resource
from models import db, PostModel
from routes.utils import update_fields


class Post(Resource):
    def get(self, id):
        try:
            post = PostModel.query.filter_by(id=id).get_or_404()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({'error': f'Post {id} not found'})

    def put(self, id):
        try:
            post = db.session.query(PostModel).filter_by(
                id=id).get_or_404()
            data = request.json
            update_fields(post, data)
            db.session.commit()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({'error': f'Error updating {id}'})
