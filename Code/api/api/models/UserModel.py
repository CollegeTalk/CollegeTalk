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
        "SubgroupModel", secondary="users_subgroups", back_populates="users"
    )
    posts = db.relationship("PostModel", cascade="all, delete")
    upvoted_posts = db.relationship(
        "PostModel", secondary="users_posts", back_populates="users_upvoted"
    )
    comments = db.relationship("CommentModel", cascade="all, delete")
    upvoted_comments = db.relationship(
        "CommentModel", secondary="users_comments", back_populates="users_upvoted"
    )

    def __init__(self, name, username=""):
        self.id = uuid4()
        self.name = name

        newUsername = username
        if newUsername == "":
            newUsername = generate_username()[0]
            newUsername = newUsername[0].upper() + newUsername[1:]
        self.username = newUsername

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
            "upvoted_posts": [post.id for post in self.upvoted_posts],
            "comments": [comment.id for comment in self.comments],
            "upvoted_comments": [comment.id for comment in self.upvoted_comments],
        }
