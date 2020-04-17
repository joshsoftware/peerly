copy-config:
	cp application.yml.default application.yml

test:
	go test -v ./...

setup-mongo:
	echo "// +build ignore" > db/pg.go.tmp
	echo "" >> db/pg.go.tmp
	cat db/pg.go >> db/pg.go.tmp
	mv db/pg.go.tmp db/pg.go
	tail +3 db/mongo.go > db/mongo.go.tmp
	mv db/mongo.go.tmp db/mongo.go
	mv db/user.go db/user.go.pg
	mv db/user.go.mongo db/user.go
	@echo
	@echo "*** Setup DB_URI, DB_NAME in your application.yml ***"
	@echo

test-coverage:
	go test ./... -coverprofile=coverage.out
	go tool cover -html=coverage.out
