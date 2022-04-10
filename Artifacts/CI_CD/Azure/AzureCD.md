# Continuous Deployment with Azure

With the combination of the Gitlab CI/CD pipeline, Azure Container Registry, and Azure App Service, a continuous deployment pipeline can be made to automatically deploy code updates to the live production app on Azure App Service.

## Setting up continuous deployment with Azure + Gitlab

1. Build and deploy code to Azure Container Registry (check Container Deployment docs in Artifacts/Deployment/Azure), and set an Azure App Service app to use the container image from the registry.
2. Configure the Gitlab CI/CD pipeline for deployment (note: I set up an Azure Service Principal account so that I could use Azure CLI commands, but an easier way is to use a Docker image and [login to the container registry with Docker](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-authentication?tabs=azure-cli#admin-account) and the container registry admin account):

```yaml
stages:
    - deploy

deploy_api_container:
    stage: deploy
    image: mcr.microsoft.com/azure-cli
    variables:
        SP_APP_ID: "<APP_ID>"
        SP_PASSWORD: "6GS_ZNYThV-4muW1.3NjlKPIIQcv.nZ9Y6"
        SP_TENANT: "b93cbc3e-661d-4058-8693-a897b924b8d7"
    script:
        - cd Code/api
        - az login --service-principal -u $SP_APP_ID -p $SP_PASSWORD --tenant $SP_TENANT
        - az acr build --registry collegetalk --image collegetalk-api .
    only:
        - main
```

3. This script will deploy a new container image (of the api) to the Docker Container Registry whenever commits are made to the main branch.
4. In the Azure Web App, turn on Continuous deployment as described in the container deployment documentation. This will create a webhook that will automatically update the app's container image whenever a new image is pushed to the container registry
