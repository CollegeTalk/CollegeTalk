# this file structure follows http://flask.pocoo.org/docs/1.0/patterns/appfactories/
from .Index import Index
from .Items import Items
from .Item import Item
from .Posts import Posts
from .Post import Post
from .Subgroups import Subgroups
from .Subgroup import Subgroup
from .User import User
from .Comment import Comment

# You must import all of the new routes you create to this page
__all__ = [
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
