# this file structure follows http://flask.pocoo.org/docs/1.0/patterns/appfactories/
from .Comment import Comment
from .Home import Home
from .Item import Item
from .ItemList import ItemList
from .Post import Post
from .PostList import PostList
from .User import User

__all__ = ['Home', 'Item', 'ItemList', 'Post', 'PostList', 'User', 'Comment']

# You must import all of the new routes you create to this page
