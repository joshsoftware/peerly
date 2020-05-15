test:
	go clean -testcache
	go test ./...

vtest:
	go clean -testcache
	go test -v ./...

test-coverage:
	go clean -testcache
	go test ./... -coverprofile=coverage.out
	go tool cover -html=coverage.out

server:
	go run main.go -- start

debug:
	dlv debug -- start

migrate:
	go run main.go migrate

resetdb:
	go run main.go rollback `/bin/ls -1 migrations/*down.sql | wc -l`
	go run main.go migrate

todo:
	grep -Rin --include="*go" "TODO" * 