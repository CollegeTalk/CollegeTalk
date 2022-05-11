# CollegeTalk

There's a lot that goes into college life for a student, but students don't always get the information they need. CollegeTalk is an application for students to communicate with each other, giving them a space to ask questions and discuss topics freely and without judgement. This consolidates many other communication platforms that are currently being used within the student body, and provides a dedicated space for students to get their questions answered.

## Contributing 

[Make sure to follow the guidelines for contributing](./Artifacts/Commit_Guidelines.md), because pushing directly into main without reviewing could destroy the production environment!

## Technologies Used

-   Frontend: React Native (React, Typescript)
-   Backend: Python
    -   API: Flask (REST API)
-   Database: PostgreSQL
-   Platform/Deployment:
    -   API: Docker container to Azure Container Registry -> Azure App Service
    -   Database: ElephantSQL


## Running the Code Locally

-   Frontend (Code/frontend):

    1. `cd Code/frontend`
    2. `npm install`
    3. Either `npm run start` or `npm run android` or `npm run ios`
    4. Navigate to http://localhost:19002

-   API (Code/api):
    - Follow the instructions and endpoints in [/Code/api](./Code/api/)
    - Some sample requests to the test table called items: 
        - PUT request to test items table with `curl http://localhost:5000/items/{item_name} -H 'Content-Type: application/json' -d '{"value":"Hello"}' -X PUT`, replacing {item_name} with a desired text
        - GET request by navigating to http://localhost:5000/items/{item_name}, with {item_name} as the text used earlier for the PUT request
        - GET the list of all items at http://localhost:5000/items

## Production Deployments

-   Frontend: https://expo.dev/@collegetalk/collegetalk?serviceType=classic&distribution=expo-go&releaseChannel=staging
-   API: https://collegetalk.azurewebsites.net/

## References
