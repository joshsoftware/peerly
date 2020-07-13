## Peerly - Rewards and Recognition system
## REST APIs

## Setup and tools:

1. Node.js v12.16.2

## Steps to create database and run migrations:
1. run npm install  (This will install all required dependencies)
2. provide environment variables of DB_USER_NAME, DB_HOST, DB_PORT, DB_DIALECT by refering .env.sample file
3. also provide environment variables of DB_NAME, DB_PASSWORD, PRODUCTION_DB_NAME, PRODUCTION_DB_PASSWORD, TEST_DB_NAME, TEST_DB_PASSWORD and NODE_ENV by default NODE_ENV is development at the time of production NODE_ENV should be production.
4. run command 'npx sequelize-cli db:create' for creating database.
5. run command 'npx sequelize-cli db:migrate' for migrating all tables.
6. run command 'npx sequelize-cli db:seed:all' for seeding data into users, roles, core_values and organisations table.

## Prerequisites for running server:
1. create google client_id, secret_key from google+ API and provide it through environment variables.(This is required for authentication of user by google login).
2. create S3 bucket and provide access_key, secret_key, bucket_name through environment variables.(This is required for uploading image)
3. provide port number and other environment variables by refering .env.sample file.

## Steps to run the server:
1. run npm start (This will start server on speified port)

## Steps for testing:
## Steps to create test-database and run migrations:
1. run npm install  (if you are running it for first time)
2. provide environment variables of DB_USER_NAME, DB_HOST, DB_PORT, DB_DIALECT by refering .env.sample file
3. also provide environment variables of TEST_DB_NAME, TEST_DB_PASSWORD and NODE_ENV=test.
4. run command 'npx sequelize-cli db:create' for creating database.
5. run command 'npx sequelize-cli db:migrate' for migrating all tables.
6. run command 'npx sequelize-cli db:seed:all' for seeding data into users, roles, core_values and organisations table.

## Prerequisites for running server:
1. create google client_id, secret_key from google+ API and provide it through environment variables.(This is required for authentication of user by google login).
2. create S3 bucket and provide access_key, secret_key, bucket_name through environment variables.(This is required for uploading image)
3. provide port number and other environment variables by refering .env.sample file.

## Steps to run the test server:
1. run npm test (This will start test server on speified port)

## Prerequisites for deployment script (one-time activity):
1. [Setup RVM](https://rvm.io/rvm/install) - version 2.7.0p0
2. Install ruby - `rvm install ruby-2.7.0`
3. `gem install mina -v 1.2.3`


## Steps for deployment:

1. `cd` into project root directory
2. `cd node-backend`
3. `mina deploy`

## step for cors configure
1. change origin value of corsOption in server.js with react server url