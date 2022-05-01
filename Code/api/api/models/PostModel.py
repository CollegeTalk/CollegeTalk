from uuid import uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from .base import db


class PostModel(db.Model):
    """
    Defines the post model
    """

    __tablename__ = "posts"

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    time_created = db.Column(db.DateTime(timezone=True))
    author_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = db.Column(db.String)
    body = db.Column(db.String)
    num_upvotes = db.Column(db.Integer)
    users_upvoted = db.relationship(
        "UserModel", secondary="users_posts", back_populates="upvoted_posts"
    )
    resolved = db.Column(db.Boolean)
    subgroup_id = db.Column(UUID(as_uuid=True), ForeignKey("subgroups.id"))
    comments = db.relationship("CommentModel", cascade="all, delete")

    def __init__(self, user_id, title, body, subgroup_id):
        self.id = uuid4()
        self.time_created = db.func.now()
        self.author_id = user_id
        self.title = title
        self.body = body
        self.num_upvotes = 0
        self.resolved = False
        self.subgroup_id = subgroup_id

    def __repr__(self):
        return f"<Post {self.id}>"

    @property
    def serialize(self):
        """
        Return post in serializeable format
        """
        return {
            "id": self.id,
            "time_created": self.time_created,
            "author_id": self.author_id,
            "title": self.title,
            "body": self.body,
            "num_upvotes": self.num_upvotes,
            "users_upvoted": [user.id for user in self.users_upvoted],
            "resolved": self.resolved,
            "subgroup_id": self.subgroup_id,
            "comments": [comment.id for comment in self.comments],
        }
