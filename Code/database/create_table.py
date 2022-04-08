import os

import sqlalchemy
from dotenv import load_dotenv
from sqlalchemy import Column, MetaData, String, Table, create_engine

load_dotenv()

USER = os.environ['POSTGRES_USER']
PASS = os.environ['POSTGRES_PASS']
HOST = os.environ['POSTGRES_HOST']
PORT = os.environ['POSTGRES_PORT']
DB = os.environ['POSTGRES_DB']
db_string = f"postgresql://{USER}:{PASS}@{HOST}:{PORT}/{DB}"

engine = create_engine(db_string)

meta = MetaData()

items = Table(
    'items', meta,
    Column('key', String, primary_key=True),
    Column('value', String),
)
meta.create_all(engine)

print(engine.table_names())
