import os
from uuid import uuid4

from dotenv import load_dotenv
from sqlalchemy import (Column, DateTime, MetaData, String, Table,
                        create_engine, func, inspect)
from sqlalchemy.dialects.postgresql import UUID

load_dotenv()

USER = os.environ['POSTGRES_USER']
PASS = os.environ['POSTGRES_PASS']
HOST = os.environ['POSTGRES_HOST']
PORT = os.environ['POSTGRES_PORT']
DB = os.environ['POSTGRES_DB']
db_string = f"postgresql://{USER}:{PASS}@{HOST}:{PORT}/{DB}"

engine = create_engine(db_string, pool_size=20)

meta = MetaData()

items = Table(
    'items', meta,
    Column('key', String, primary_key=True),
    Column('value', String),
)

posts = Table(
    'posts', meta,
    Column('id', UUID(as_uuid=True), primary_key=True,
           default=uuid4),
    Column("time_created", DateTime(timezone=True),
           server_default=func.now()),
    Column("title", String),
    Column("body", String)
)

meta.create_all(engine)

inspector = inspect(engine)
print("Tables List:")
print("==============")
for table_name in inspector.get_table_names():
    print(f"{table_name}")
