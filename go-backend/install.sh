#!/bin/bash +x

DB="pg"

while test $# -gt 0; do
  case "$1" in
    -h|--help)
      echo "$package - boilerplate for Golang"
      echo " "
      echo "$package [options]"
      echo " "
      echo "options:"
      echo "-h, --help  show brief help"
      echo "-p PACKAGE  specify the package. Eg. gautamrege/sample"
      echo "-d DB       specify the DB {mongo|pg}"
      exit 0
      ;;
    -p)
      shift
      if test $# -gt 0; then
        PACKAGE=$1
      else
        echo "no package specified"
        exit 1
      fi
      shift
      ;;
    -d)
      shift
      if test $# -gt 0; then
        DB=$1
      else
        echo "no DB specified"
        exit 1
      fi

      if [ "$DB" != "pg" ] && [ "$DB" != "mongo" ]; then
	echo "Unsupported database! Only 'mongo' or 'pg' supported currently."
	exit 1
      fi
      shift
      ;;
    *)
      break
      ;;
   esac
done

if [ "$PACKAGE" == "" ]; then
	echo "Package is mandatory. Use -p <package name>."
	exit 1
fi

# For the internal scripts, we need extra escape chars
PACKAGE_S=`echo $PACKAGE | sed -e 's/\//\\\\\//g'`

git clone git@github.com:joshsoftware/golang-boilerplate.git
rm -rf golang-boilerplate/.git
cp -r golang-boilerplate/* .
rm -rf golang-boilerplate
sed -i bkp s/joshsoftware\\\/golang-boilerplate/$PACKAGE_S/g *.go
sed -i bkp s/joshsoftware\\\/golang-boilerplate/$PACKAGE_S/g */*.go

# Cleanup the bkp files
find . -name *bkp | xargs -I{} rm {}
find ./. -name *bkp | xargs -I{} rm {}

if [ "$DB" == "mongo" ]; then
  tail +3 db/mongo.go > db/mongo.go.tmp
  mv db/mongo.go.tmp db/mongo.go
  rm db/pg.go 
  mv db/user.go.mongo db/user.go
else
  rm db/mongo.go db/user.go.mongo
fi

rm go.mod go.sum
go mod init $PACKAGE

BINARY=`echo $PACKAGE | sed -e 's/^.*\///g'`

echo $BINARY >> .gitignore

cp application.yml.default application.yml

echo
echo "*********** Service setup completed **************"
echo "Microservice: $PACKAGE"
echo "Database: $DB"
echo
echo "*** Please configure application.yml ***"
echo "Then run 'go build' to build your service."
echo "**************************************************"
echo


