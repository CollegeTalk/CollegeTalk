"""
Application factory that creates the Flask app instance.
"""
import os

import click
from flask import Flask
from flask.cli import with_appcontext
from flask_migrate import init, migrate, stamp, upgrade
from sqlalchemy_utils import create_database, database_exists

from .migration import migration
from .models import db
from .routes import api


@click.command("recreate-db")
@with_appcontext
def recreate_db():
    """
    Recreates the database. Run with `flask recreate-db`
    """
    db.drop_all()
    db.create_all()
    db.session.commit()
    click.echo("Database recreated.")


@click.command("migrate-db")
@with_appcontext
def migrate_db():
    """
    Migrates the database. Run with `flask migrate-db`
    """
    db.create_all()
    init()
    stamp()
    migrate()
    upgrade()
    click.echo("Database migrated.")


def create_app(test_config=None):
    """
    Factory function that creates the Flask app instance.
    """
    app = Flask(__name__)

    env = os.environ.get("FLASK_ENV", "development")
    if test_config:
        app.config.from_mapping(**test_config)
    else:
        from .config import config

        app.config.from_object(config[env])

    api.init_app(app)

    if env != "production" and env != "staging":
        db_url = app.config["SQLALCHEMY_DATABASE_URI"]
        if not database_exists(db_url):
            create_database(db_url)

    db.init_app(app)

    if env != "production" and env != "staging":
        with app.app_context():
            db.create_all()

    migration.init_app(app, db)

    app.cli.add_command(recreate_db)
    app.cli.add_command(migrate_db)

    return app
