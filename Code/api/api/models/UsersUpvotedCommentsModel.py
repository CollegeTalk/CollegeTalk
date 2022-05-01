from uuid import uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from .base import db


class UsersUpvotedCommentsModel(db.Model):
    """
    Defines the users_comments model
    """

    __tablename__ = "users_comments"

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id"))
    upvoted_comment_id = db.Column(
        UUID(as_uuid=True), ForeignKey("comments.id"))

    def __init__(self, user_id, upvoted_comment_id):
        self.id = uuid4()
        self.user_id = user_id
        self.upvoted_post_id = upvoted_comment_id
