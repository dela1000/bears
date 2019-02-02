# Bears

## Instructions:

1. Before installing, navigate to `backend/secrets.js` and add the root and password credentials for the local SQL setup. The database will not be able to run locally without these credentials, so please make sure those are on that file before moving to the next step.

2. After that, run `npm i` in the root folder. This will install both sets of dependecies for the server and for the ReactJS application, will create a SQL database, will run a NodeJS server which hosts the API, and will run the React app on the browser. 

The installation process might take a few minutes.

## Relevant files:

- `backend/db.js` writes the SQL database if it's not found on the current machine.
- `backend/routes.js` holds the routes that are available on the API.
- `backend/controller.js` manipulates the data and connects the models with the route.
- `backend/models.js` creates the query string and connects with the database.
- `backend/secrets.js` holds the SQL credentials.


