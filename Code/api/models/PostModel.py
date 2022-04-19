from .base import db
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4


class PostModel(db.Model):
    '''
    Defines the post model
    '''

    __tablename__ = 'posts'

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    time_created = db.Column(db.DateTime(timezone=True))
    author_id = db.Column(UUID(as_uuid=True))
    author_name = db.Column(db.String)
    title = db.Column(db.String)
    body = db.Column(db.String)
    num_upvotes = db.Column(db.Integer)
    subgroup_id = db.Column(UUID(as_uuid=True))
    subgroup_name = db.Column(db.String)

    def __init__(self, author_id, author_name, title, body, subgroup_id, subgroup_name):
        self.id = uuid4()
        self.time_created = db.func.now()
        self.author_id = author_id
        self.author_name = author_name
        self.title = title
        self.body = body
        self.num_upvotes = 0
        self.subgroup_id = subgroup_id
        self.subgroup_name = subgroup_name

    def __repr__(self):
        return f'<Post {self.id}>'

    @property
    def serialize(self):
        '''
        Return post in serializeable format
        '''
        return {
            'id': self.id,
            'time_created': self.time_created,
            'author_id': self.author_id,
            'author_name': self.author_name,
            'title': self.title,
            'body': self.body,
            'num_upvotes': self.num_upvotes,
            'subgroup_id': self.subgroup_id,
            'subgroup_name': self.subgroup_name
        }
