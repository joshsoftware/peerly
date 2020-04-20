## Golang Boilerplate
Golang boilerplate to kickstart any go api project. This supports 2 database configurations currently:

* MongoDB
* Postgres (default)

### Installing and configuring the boilerplate!

Get the install.sh script into your microservice develeopment directory.

```
wget https://raw.githubusercontent.com/joshsoftware/golang-boilerplate/master/install.sh
```

Run the script with the options:

```
. ./install.sh -p package_name [-d {mongo|pg}] [-h]
```

-p: [mandatory] Usually your github handle and service name. Eg. gautamrege/testly or github.com/corp/pkg/service

-d:  [optional] Default: pg. Specify 'mongo' for mongoDB setup

-h:  [optional] Display help

### Testing

Run test locally
```
$ make test
```
