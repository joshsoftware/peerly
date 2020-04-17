## Golang Boilerplate
Golang boilerplate to kickstart any go api project. This supports 2 database configurations currently:

* MongoDB
* Postgres (default)

### Setup

Run this command to copy sample config file (application.yml.sample) to application.yml. 
Please do not forgot to update the DB env variables in it according to your local setup.
```
$ make copy-config
```

### Setup for MongoDB

Run this command ONLY ONCE to convert this boilerplate to use MongoDB instead of Postgres.
```
$ make setup-mongo
```

### Testing

Run test locally
```
$ make test
```
