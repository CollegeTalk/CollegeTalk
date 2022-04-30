from uuid import uuid4
from random_username.generate import generate_username

from sqlalchemy.dialects.postgresql import UUID

from .base import db


class UserModel(db.Model):
    """
    Defines the user model
    """

    __tablename__ = "users"

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    subgroups = db.relationship(
        "SubgroupModel", secondary="subgroup_users", back_populates="users")
    posts = db.relationship("PostModel")
    comments = db.relationship("CommentModel")

    def __init__(self, name, username=""):
        self.id = uuid4()
        self.name = name
        self.username = generate_username()[0] if username == "" else username

    def __repr__(self):
        return f"<User {self.id}>"

    @property
    def serialize(self):
        """
        Return user in serializeable format
        """
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "subgroups": [subgroup.id for subgroup in self.subgroups],
            "posts": [post.id for post in self.posts],
            "comments": [comment.id for comment in self.comments]
        }
