from uuid import uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from .base import db


class SubgroupUsersModel(db.Model):
    """
    Defines the subgroup_users model
    """

    __tablename__ = "subgroup_users"

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    subgroup_id = db.Column(UUID(as_uuid=True), ForeignKey("subgroups.id"))
    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id"))

    def __init__(self, subgroup_id, user_id):
        self.id = uuid4()
        self.subgroup_id = subgroup_id
        self.user_id = user_id

    def __repr__(self):
        return f"<SubgroupUsers {self.id}>"

    @property
    def serialize(self):
        """
        Return subgroup_users in serializeable format
        """
        return {
            "id": self.id,
            "subgroup_id": self.subgroup_id,
            "user_id": self.user_id,
        }
