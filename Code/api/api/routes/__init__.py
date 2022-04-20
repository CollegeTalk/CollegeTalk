# this file structure follows http://flask.pocoo.org/docs/1.0/patterns/appfactories/
from .base import api
from .Comment import Comment
from .Index import Index
from .Item import Item
from .Items import Items
from .Post import Post
from .Posts import Posts
from .Subgroup import Subgroup
from .Subgroups import Subgroups
from .User import User

# You must import all of the new routes you create to this page
__all__ = [
    'api',
    'Index',
    'Items',
    'Item',
    'Posts',
    'Post',
    'Subgroups',
    'Subgroup',
    'User',
    'Comment'
]
