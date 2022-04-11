# this file structure follows http://flask.pocoo.org/docs/1.0/patterns/appfactories/
from .Home import Home
from .Item import Item
from .ItemList import ItemList
from .Post import Post
from .PostList import PostList

__all__ = ["Home", "Item", "ItemList", "Post", "PostList"]

# You must import all of the new routes you create to this page
