# this file structure follows http://flask.pocoo.org/docs/1.0/patterns/appfactories/
# initializing db in api.models.base instead of in api.__init__.py
# to prevent circular dependencies
from .base import db
from .ItemsModel import ItemsModel
from .PostsModel import PostsModel

__all__ = ["ItemsModel", "PostsModel", "db"]

# You must import all of the new Models you create to this page