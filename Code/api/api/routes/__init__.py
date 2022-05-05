# this file structure follows http://flask.pocoo.org/docs/1.0/patterns/appfactories/
from .base import api
from .Index import Index
from .Item import Item
from .Items import Items

from .User import User
from .Users import Users
from .Subgroup import Subgroup
from .Subgroups import Subgroups
from .Post import Post
from .Posts import Posts
from .Comment import Comment
from .Comments import Comments

# You must import all of the new routes you create to this page
__all__ = [
    "api",
    "Index",
    "Items",
    "Item",
    "Users",
    "User",
    "Subgroups",
    "Subgroup",
    "Comments",
    "Comment",
    "Posts",
    "Post"
]
