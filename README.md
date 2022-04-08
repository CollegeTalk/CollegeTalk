# CollegeTalk

There's a lot that goes into college life for a student, but student's don't always get the information they need. CollegeTalk is an application for students to communicate with each other, giving them a space to ask questions and discuss topics freely and without judgement. This consolidates many other communication platforms that are currently being used within the student body, and provides a dedicated space for students to get their questions answered.

## Technologies Used

-   Frontend: Next.js (React, Typescript)
-   Backend: Python
    -   API: Flask
-   Platform/Deployment: Azure
-   Database: PostgreSQL

## Running the Code Locally

-   Frontend (Code/frontend):

    1. `cd Code/frontend`
    2. `npm install`
    3. Either `npm run start` or `npm run android` or `npm run ios`
    4. Navigate to http://localhost:19002

-   API (Code/api):
    1. `cd Code/api`
    2. Setup PostgreSQL and create a database
    3. In a `.env` file, Set `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASS`, and `POSTGRES_DB` to appropriate values.
    4. Activate a venv if desired, then run `pip install -r requirements.txt`
    5. `flask run`
    6. Navigate to http://localhost:5000
    7. You can make a PUT request with `curl http://localhost:5000/items/{item_name} -H 'Content-Type: application/json' -d '{"value":"Hello"}' -X PUT`, replacing {item_name} with a desired text. You can then make a GET request by navigating to http://localhost:5000/items/{item_name}, with {item_name} as the text used earlier for the PUT request.
    8. Get a list of items at http://localhost:5000/items

## References

-   Frontend: local deployment
-   API: https://collegetalk-api.azurewebsites.net/
