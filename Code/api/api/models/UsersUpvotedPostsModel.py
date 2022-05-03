from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from .base import db


class UsersUpvotedPostsModel(db.Model):
    """
    Defines the users_posts model
    """

    __tablename__ = "users_posts"

    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    upvoted_post_id = db.Column(UUID(as_uuid=True), ForeignKey("posts.id"), primary_key=True)
