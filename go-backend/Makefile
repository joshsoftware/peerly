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
