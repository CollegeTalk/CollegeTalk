# this file structure follows http://flask.pocoo.org/docs/1.0/patterns/appfactories/
# initializing db in api.models.base instead of in api.__init__.py
# to prevent circular dependencies
from .base import db
from .ItemModel import ItemModel
from .UsersJoinedSubgroupsModel import UsersJoinedSubgroupsModel
from .UsersUpvotedPostsModel import UsersUpvotedPostsModel
from .UsersUpvotedCommentsModel import UsersUpvotedCommentsModel
from .UserModel import UserModel
from .SubgroupModel import SubgroupModel
from .PostModel import PostModel
from .CommentModel import CommentModel

__all__ = [
    "db",
    "ItemModel",
    "UsersJoinedSubgroupsModel",
    "UsersUpvotedPostsModel",
    "UsersUpvotedCommentsModel",
    "UserModel",
    "SubgroupModel",
    "PostModel",
    "CommentModel",
]

# You must import all of the new Models you create to this page
