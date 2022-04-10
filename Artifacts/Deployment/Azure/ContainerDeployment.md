# Container Deployment to Azure

Developers can deploy a Dockerized web app to Azure App Service using this tutorial: https://docs.microsoft.com/en-us/learn/modules/deploy-run-container-app-service/

## Steps followed

0. Prerequisites: Have [Docker](https://docs.docker.com/get-docker/) and the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed locally (and have Azure account setup)
1. Create `Dockerfile` in root of the directory to deploy, which in my case, was `Code/api`, for a Flask app
2. Add the following lines to the Dockerfile (commented):

```Dockerfile
FROM python:latest # Pull latest Python Docker image, for the base environment

WORKDIR /api # Set the working directory to a new directory called /api

COPY requirements.txt requirements.txt # Copy local requirements.txt to /api

RUN pip3 install -r requirements.txt # Install the requirements.txt in the container

COPY . . # Copy rest of the files to /api

CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0"] # Start the app in the container
```

3. Test the container locally by first building the container image: `docker build --tag collegetalk-api .` then running the container: `docker run -d -p 127.0.0.1:5000:5000 collegetalk-api`
4. Following the tutorial in the above link, create an Azure Container Registry resource
5. Send files to be built as a container in Azure Container Registry: `az acr build --registry collegetalk --image collegetalk-api .`
6. Following the tutorial, create a containerized web app with Azure App Service
7. Turn on Continuous deployment in the App Service's Deployment Center so that updates to the container will automatically update the app
