#  Omics API

## Description

This applications is designed to hold and serve omics data. Basically there are two entities: Experiment and Gene. There is one to many relationship between Experiment and Gene.

PostgreSql database is used to store the data. There are two tables for corresponding entities.

- Experiment Entity just holds experiment date and name.

- Gene entity holds experimentId, gene name, transcripts for the gene and expression values in the samples. ExpressionValues field is a JSONB field and consists of sample name and value pairs.

## Installation

The application is dockerized. As you can see in docker-compose file there are two services, one is for PostgreSql database, the other is for the API.

Before running the following commands, please make sure that the .env file is configured correctly. By default, it'll create a DB on port 5439 and application will run on port 3006.

```bash
# run postresql
$ docker compose up -d postgresql
# run api
$ docker compose up --build -V comicsapi
```

## Running the app

```bash
# development
$ docker compose up comicsapi

# for debugging please change command of commics service in docker-compose file.
```

## Test

```bash
# unit tests
$ npm run test
```

## Tools

- You can use swagger to use endpoints. You can reach it on http://localhost:3006/swagger

- typeorm is used as a ORM tool. By default migrations will run each time we build the docker image.

- There is also a postman collection to reach the API. Please check `Omics.postman_collection.json` file.
