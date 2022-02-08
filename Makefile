docker:
	@docker build . -t kidsan/thing-api:latest
	@docker tag kidsan/thing-api:latest kidsan/thing-api:$(shell git rev-parse --short --verify master)