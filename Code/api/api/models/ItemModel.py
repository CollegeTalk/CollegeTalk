from .base import db


class ItemModel(db.Model):
    """
    Test model: Defines the item model
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
