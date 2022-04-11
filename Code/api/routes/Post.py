from flask import jsonify, request
from flask_restful import Resource
from models import PostsModel, db


class Post(Resource):
    def get(self, id):
        # curl http://localhost:5000/posts/{id}
        try:
            post = PostsModel.query.filter_by(id=id).first_or_404()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({"error": f"Post {id} not found"})

    def put(self, id):
        # curl http://localhost:5000/posts/{id} -H 'Content-Type: application/json' -d '{"title":"test", "body":"blah blah blah"}' -X PUT
        try:
            post = db.session.query(PostsModel).filter_by(
                id=id).first()
            data = request.json
            print(request.json)
            for key, value in data.items():
                print(key, value)
            print(data["title"], ' ', data["body"])
            if post:
                post.title = data["title"]
                post.body = data["body"]
                db.session.commit()
            else:
                post = PostsModel(id, db.func.now(),
                                  data["title"], data["body"])
                db.session.add(post)
                db.session.commit()
            return jsonify(post.serialize)
        except RuntimeError:
            return jsonify({"error": f"Error adding/updating {id}"})
