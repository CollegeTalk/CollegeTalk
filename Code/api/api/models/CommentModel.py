from uuid import uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from .base import db


class CommentModel(db.Model):
    """
    Defines the post model
    """

    __tablename__ = "comments"

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    time_created = db.Column(db.DateTime(timezone=True))
    author_id = db.Column(UUID(as_uuid=True))
    body = db.Column(db.String)
    num_upvotes = db.Column(db.Integer)
    helpful_answer = db.Column(db.Boolean)
    post_id = db.Column(UUID(as_uuid=True), ForeignKey("posts.id"))

    def __init__(self, author_id, body, post_id):
        self.id = uuid4()
        self.time_created = db.func.now()
        self.author_id = author_id
        self.body = body
        self.num_upvotes = 0
        self.helpful_answer = False
        self.post_id = post_id

    def __repr__(self):
        return f"<Comment {self.id}>"

    @property
    def serialize(self):
        """
        Return comment in serializeable format
        """
        return {
            "id": self.id,
            "time_created": self.time_created,
            "author_id": self.author_id,
            "body": self.body,
            "num_upvotes": self.num_upvotes,
            "helpful_answer": self.helpful_answer,
            "post_id": self.post_id,
        }
