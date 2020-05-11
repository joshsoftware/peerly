## Peerly - Rewards and Recognition system
## REST APIs

## Setup and tools:

1. Node.js v12.16.2


## Steps to run the server:
1. run npm install  (This will install all required dependencies)
2. run SERVER_PORT=<port_number> npm start (This will start server on speified port)


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