from flask_restful import Resource


class Index(Resource):
    def get(self):
        return 'Hello World! Go to /items to see a list of items, make PUT requests to /items/<key> to add or update an item.'
