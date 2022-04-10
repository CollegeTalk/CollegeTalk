import os

from dotenv import load_dotenv
from sqlalchemy import Column, MetaData, Integer, String, Identity, DateTime, func, Table, create_engine

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

posts = Table(
    'posts', meta,
    Column('id', Integer, primary_key=True),
    Column('value', String),
    Column('id', Integer, Identity(
        start=42, cycle=True), primary_key=True),
    Column("time_created", DateTime(timezone=True),
                           server_default=func.now()),
    Column("title", String),
    Column("body", String)
)

meta.create_all(engine)

print(engine.table_names())
