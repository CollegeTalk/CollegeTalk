# CI/CD

On Gitlab, the `.gitlab-ci.yml` in the root of the project allows for creation of a CI/CD pipeline for automatic building, testing, and deploying when making commits and merges. A good guide of CI/CD concepts for Gitlab can be found here: https://docs.gitlab.com/ee/ci/introduction/

![gitlab ci/cd](./gitlab_workflow_example_11_9.png)

## General notes

-   The pipeline can be specified to run only on commits to certain branches or changes to certain directories or files so that different stages can be run on different directories.
-   Defining `image` in the pipeline file will allow a Docker image to be pulled to run the job in. This can be useful for having environments with pre-installed apps and packages.

## Current CI/CD Pipeline

```yaml
stages:
    - build
    - staging
    - deploy

build_api_container:
    stage: build
    script:
        - echo "Building api"
        - echo "Testing api"
    only:
        changes:
            - Code/api/**/*

staging_api_container:
    stage: staging
    image: mcr.microsoft.com/azure-cli
    variables:
        SP_APP_ID: "969444b4-e4a6-4689-9394-4aac3b50441d"
        SP_PASSWORD: "6GS_ZNYThV-4muW1.3NjlKPIIQcv.nZ9Y6"
        SP_TENANT: "b93cbc3e-661d-4058-8693-a897b924b8d7"
    script:
        - cd Code/api
        - az login --service-principal -u $SP_APP_ID -p $SP_PASSWORD --tenant $SP_TENANT
        - az acr build --registry collegetalk --image collegetalk-api-staging .
    only:
        refs:
            - merge_requests
        changes:
            - Code/api/**/*

deploy_api_container:
    stage: deploy
    image: mcr.microsoft.com/azure-cli
    variables:
        SP_APP_ID: "969444b4-e4a6-4689-9394-4aac3b50441d"
        SP_PASSWORD: "6GS_ZNYThV-4muW1.3NjlKPIIQcv.nZ9Y6"
        SP_TENANT: "b93cbc3e-661d-4058-8693-a897b924b8d7"
    script:
        - cd Code/api
        - az login --service-principal -u $SP_APP_ID -p $SP_PASSWORD --tenant $SP_TENANT
        - az acr build --registry collegetalk --image collegetalk-api .
    only:
        - main
```

### Build

Currently still work in progress, will run tests and build whenever a push is made, no matter the branch.

### Staging

Will run when merge requests are made. This will push to a live staging environment, to make sure that code is deploying properly

### Deploy

Runs when the main branch is pushed to, deploying to a production environment.
