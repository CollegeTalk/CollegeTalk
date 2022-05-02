from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from .base import db


class UsersUpvotedCommentsModel(db.Model):
    """
    Defines the users_comments model
    """

    __tablename__ = "users_comments"

    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    upvoted_comment_id = db.Column(UUID(as_uuid=True), ForeignKey("comments.id"), primary_key=True)
