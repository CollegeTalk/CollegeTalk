from .base import db
from sqlalchemy.dialects.postgresql import UUID

class PostModel(db.Model):
    """
    Defines the post model
    """

    __tablename__ = "posts"

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    time_created = db.Column(db.DateTime(timezone=True))
    title = db.Column(db.String)
    body = db.Column(db.String)

    def __init__(self, id, time_created, title, body):
        self.id = id
        self.time_created = time_created
        self.title = title
        self.body = body

    def __repr__(self):
        return f"<Post {self.id}>"

    @property
    def serialize(self):
        """
        Return post in serializeable format
        """
        return {"id": self.id, "time_created": self.time_created, "title": self.title, "body": self.body}
