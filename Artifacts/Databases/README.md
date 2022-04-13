# Databases

Using the microservices architecture, we will be using one database per service. For early prototypes, we will use a single database, but migrating to separate databases when work on the services begin.

## Sprint 1

The first iteration of the shared database for posts will follow the following schema:

![Posts database](db_posts.png)

User text posts are highly structured, which is why we chose to use a relational database. PostgreSQL was chosen due to team members having more experience working with it over other databases.

This first iteration of the database is hosted on ElephantSQL, which in turn hosts the databases in a PostgreSQL database on Azure. In the future, we plan on cutting the middleman and migrating the posts database and future databases to Azure, since ElephantSQL's free plan has a low data limit and has a low transaction limit.
