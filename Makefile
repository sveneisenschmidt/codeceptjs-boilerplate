PROJECT := codeceptjs-boilerplate
COMPOSE := docker-compose -p $(PROJECT)

all:
	# Targets:
	#	install					Build and installs dependencies
    #   test                    Runs the codeceptjs testsuite
	#	clean					Cleans node_modules, ouput and docker containers
	#	start-selenium			Starts the selenium server
	# 	stop-selenium			Stops the selenium server

install:
	@$(COMPOSE) build node
	@$(COMPOSE) run --rm node bash -c 'yarn'

shell:
	@$(COMPOSE) run --rm --service-ports node bash

test:
	@$(COMPOSE) run --rm --service-ports node bash -c 'npm run test'

test-parallel:
	@$(COMPOSE) run --rm --service-ports node bash -c 'npm run test-parallel'

start-selenium:
	@$(COMPOSE) up -d selenium-hub
	@echo "Selenium VNC server is running at 0.0.0.0:59001"

stop-selenium:
	@$(COMPOSE) stop selenium-hub selenium-node-firefox selenium-node-chrome

clean:
	@rm -rf node_modules
	@rm -rf output/*
	docker-compose stop
	docker-compose rm
