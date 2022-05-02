from uuid import uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from .base import db


class UsersUpvotedCommentsModel(db.Model):
    """
    Defines the users_comments model
    """

    __tablename__ = "users_comments"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4())
    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id"))
    upvoted_comment_id = db.Column(UUID(as_uuid=True), ForeignKey("comments.id"))
