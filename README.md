# CollegeTalk

There's a lot that goes into college life for a student, but student's don't always get the information they need. CollegeTalk is an application for students to communicate with each other, giving them a space to ask questions and discuss topics freely and without judgement. This consolidates many other communication platforms that are currently being used within the student body, and provides a dedicated space for students to get their questions answered. 

## Technologies Used

- Frontend: Next.js (React, Typescript)
- Backend: Python
    - API: Flask
- Platform/Deployment: Azure
- Database: PostgreSQL 

## Running the Code Locally

- Frontend (Code/frontend):
    1. ```cd Code/frontend```
    2. ```npm install```
    3. Either ```npm run dev``` or ```yarn dev```
    4. Navigate to http://localhost:3000

- API (Code/api):
    1. ```cd Code/api```
    2. Activate a venv if desired, then run ```pip install -r requirements.txt```
    3. ```flask run```
    4. Navigate to http://localhost:5000
    5. You can make a PUT request with ```curl http://localhost:5000/{id} -d "data=Hello World" -X PUT```, replacing {id} with a desired text. You can then make a GET request by navigating to http://localhost:5000/{id}, with {id} as the text used earlier for the PUT request.

## References

- Frontend: https://collegetalk.azurewebsites.net/
- API: https://collegetalk-api.azurewebsites.net/
