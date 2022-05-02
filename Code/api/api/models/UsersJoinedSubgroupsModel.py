from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from .base import db


class UsersJoinedSubgroupsModel(db.Model):
    """
    Defines the users_subgroups model
    """

    __tablename__ = "users_subgroups"

    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    subgroup_id = db.Column(UUID(as_uuid=True), ForeignKey("subgroups.id"), primary_key=True)
