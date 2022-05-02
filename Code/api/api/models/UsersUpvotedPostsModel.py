from uuid import uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from .base import db


class UsersUpvotedPostsModel(db.Model):
    """
    Defines the users_posts model
    """

    __tablename__ = "users_posts"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4())
    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id"))
    upvoted_post_id = db.Column(UUID(as_uuid=True), ForeignKey("posts.id"))
