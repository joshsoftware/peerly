test:
	go test ./...

vtest:
	go test -v ./...

test-coverage:
	go test ./... -coverprofile=coverage.out
	go tool cover -html=coverage.out

server:
	go run main.go -- start

debug:
	dlv debug -- start
