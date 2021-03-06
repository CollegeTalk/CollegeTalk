from uuid import uuid4

from sqlalchemy.dialects.postgresql import UUID

from .base import db


class SubgroupModel(db.Model):
    """
    Defines the subgroup model
    """

    __tablename__ = "subgroups"

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    name = db.Column(db.String, unique=True)
    description = db.Column(db.String)
    posts = db.relationship("PostModel", cascade="all, delete")
    users = db.relationship(
        "UserModel", secondary="users_subgroups", back_populates="subgroups", cascade="all, delete"
    )

    def __init__(self, name, description):
        self.id = uuid4()
        self.name = name
        self.description = description

    def __repr__(self):
        return f"<Subgroup {self.id}>"

    @property
    def serialize(self):
        """
        Return subgroup in serializeable format
        """
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "posts": [post.id for post in self.posts],
            "users": [user.id for user in self.users],
        }
