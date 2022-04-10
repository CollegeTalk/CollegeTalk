from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class ItemsModel(db.Model):
    """
    Defines the items model
    """

    __tablename__ = "items"

    key = db.Column("key", db.String, primary_key=True)
    value = db.Column("value", db.String)

    def __init__(self, key, value):
        self.key = key
        self.value = value

    def __repr__(self):
        return f"<Item {self.key}>"

    @property
    def serialize(self):
        """
        Return item in serializeable format
        """
        return {"key": self.key, "value": self.value}


class PostsModel(db.Model):
    """
    Defines the posts model
    """

    __tablename__ = "posts"

    id = db.Column('id', db.Integer, db.Identity(
        start=42, cycle=True), primary_key=True)
    time_created = db.Column(db.DateTime(timezone=True),
                             server_default=db.func.now())
    title = db.Column("title", db.String)
    body = db.Column("body", db.String)

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
