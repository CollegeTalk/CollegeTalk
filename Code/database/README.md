This directory will be used for files for a temporary database for an early working demo. Since each microservice will have its own database, this directory will be removed after work on those microservices begin.

## Test Demo Database Local Setup

To work with a local database, do the following:

1. Install PostgreSQL to your computer
2. Setup user info in PostgreSQL, and create a new database
3. Activate a venv, then run `pip install -r requirements.txt`
4. In a `.env` file, Set `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASS`, and `POSTGRES_DB` to appropriate values.
5. Run `create_table.py`, which will create a table named "items", with columns "key" and "value", which can now be used with the API (Code/api)
