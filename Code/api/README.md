# CollegeTalk API

This is the CollegeTalk API Gateway to access microservices. For now, it acts as a simple business layer until we begin implementation of our microservices.

The deployed API staging environment can be found here: https://collegetalk-staging.azurewebsites.net/

The deployed API production environment will be live here: http://collegetalk.azurewebsites.net/

## Endpoints

The API has six endpoints currently.

-   /items  - a test endpoint that shows the list of items, storing key and value as string (GET, PUT). This endpoint will be removed eventually.
    -   /items/{item_id} - an individual item and its data (GET, PUT)
-   /posts - posts in the database (GET, POST)
    -   /posts/{post_id} - an individual post, which has an uuid id, timestamp, uuid author, string title, string body, and uuid subgroup (GET, PUT)
-   /subgroups - subgroups in the database (GET, POST)
    -   /subgroups/{subgroup_id} - an individual subgroup, which has an uuid id, string name, string description, and a relation to the posts that are part of the subgroup (GET, PUT)

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

## Testing
To run tests, make sure the packages in `requirements-dev.txt` are installed, then run `pytest`. Pytest will run through test cases in `Code/api/tests`. To see code coverage, run `coverage run -m pytest`, and then when the tests are complete, run `coverage report` to see code coverage.

## Misc 
To delete and recreate a database with a schema according to the models in `Code/api/api/models`, first make sure the target database credentials are correct in `.env`, then run `flask recreate-db`.
