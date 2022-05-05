"""
Reads from dummy_table_data.sql and inserts the values into the database (from .env)
Make sure the tables have been created before running this script.
"""
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

USER = os.environ.get("POSTGRES_USER")
PASS = os.environ.get("POSTGRES_PASS")
HOST = os.environ.get("POSTGRES_HOST")
PORT = os.environ.get("POSTGRES_PORT")
DB = os.environ.get("POSTGRES_DB")
db_string = f"postgresql://{USER}:{PASS}@{HOST}:{PORT}/{DB}"

engine = create_engine(db_string, echo=True)

with engine.connect() as con:
    with open("./dummy_table_data.sql") as file:
        query = text(file.read())
        con.execute(query)
