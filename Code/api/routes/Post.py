from flask import jsonify, request
from flask_restful import Resource
from models import PostModel, db


class Post(Resource):
    def get(self, id):
        # curl http://localhost:5000/posts/{post_id}
        try:
            post = PostModel.query.filter_by(id=id).first_or_404()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({'error': f'Post {id} not found'})

    def put(self, id):
        # curl http://localhost:5000/posts/{post_id} -H 'Content-Type: application/json' -d '{'title':'test', 'body':'blah blah blah'}' -X PUT
        try:
            post = db.session.query(PostModel).filter_by(
                id=id).first()
            data = request.json
            if post:
                post.author_name = data['author_name']
                post.title = data['title']
                post.body = data['body']
                post.num_upvotes = data['num_upvotes']
                post.subgroup_name = data['subgroup_name']
            else:
                post = PostModel(
                    data['author_id'],
                    data['author_name'],
                    data['title'],
                    data['body'],
                    data['subgroup_id'],
                    data['subgroup_name'])
                db.session.add(post)
            db.session.commit()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({'error': f'Error adding/updating {id}'})
