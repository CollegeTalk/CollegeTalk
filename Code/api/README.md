# CollegeTalk API

The deployed API staging environment can be found here: https://collegetalk-staging.azurewebsites.net/

The deployed API production environment will be live here: http://collegetalk.azurewebsites.net/

## Endpoints

The API has two endpoints currently.

-   /items - a test endpoint that shows the list of items, storing key and value as string. This endpoint will be removed eventually.
    -   /items/{item_id} - an individual item and its data
-   /posts - posts in the database
    -   /posts/{post_id} - an individual post, which has an int id, timestamp , and string title and body

## Running the API

### Locally

1. Make sure to have PostgreSQL setup on your computer, create a database, and create a .env file with appropriate values `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASS`, and `POSTGRES_DB` from how you setup your Postgres account and database. Here is a sample version, with user, pass, and db being the most likely to differ:

```bash
POSTGRES_HOST = "127.0.0.1"
POSTGRES_PORT = 5432
POSTGRES_USER = "postgres"
POSTGRES_PASS = "psqlpassword"
POSTGRES_DB = "test"
```

2. In `Code/api`, create a new venv, then run `pip install -r requirements.txt`
3. Run `flask run`
4. Navigate to `localhost:5000`

### Docker

1. With Docker, you only need to have Docker and docker-compose installed, with no need for Postgres or any database setup
2. In `Code/` run `docker-compose up`
3. When the text says the containers are ready, navigate to `localhost:5000`
