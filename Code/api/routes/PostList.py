from flask import jsonify, request
from flask_restful import Resource
from models import PostModel, db


class PostList(Resource):
    def get(self):
        # get a limited number of posts, newest to oldest
        # curl http://localhost:5000/posts?limit=1 -H 'Content-Type: application/json'
        # get all posts, newest to oldest
        # curl http://localhost:5000/posts -H 'Content-Type: application/json'
        limit = request.args.get('limit')
        if limit != None and limit.isnumeric() and int(limit) >= 0:
            posts = PostModel.query.order_by(
                PostModel.time_created.desc()).limit(int(limit))
            return jsonify([post.serialize for post in posts])
        else:
            posts = PostModel.query.order_by(PostModel.time_created.desc())
            return jsonify([post.serialize for post in posts])

    def post(self):
        # Post new item
        # curl http://localhost:5000/posts -H 'Content-Type: application/json' -d '{'title':'test', 'body':'blah blah blah'}' -X POST
        try:
            data = request.json
            post = PostModel(
                data['author_id'],
                data['author_name'],
                data['title'],
                data['body'],
                data['subgroup_id'],
                data['subgroup_name']
            )
            db.session.add(post)
            db.session.commit()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({'error': f'Error adding {id}'})
