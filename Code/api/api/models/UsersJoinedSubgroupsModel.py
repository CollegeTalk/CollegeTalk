from uuid import uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from .base import db


class UsersJoinedSubgroupsModel(db.Model):
    """
    Defines the users_subgroups model
    """

    __tablename__ = "users_subgroups"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4())
    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id"))
    subgroup_id = db.Column(UUID(as_uuid=True), ForeignKey("subgroups.id"))
