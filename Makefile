PROJECT := codeceptjs-boilerplate
COMPOSE := docker-compose -p $(PROJECT)

all:
	# Targets:
	#	build					Build and installs dependencies
    #   test                    Runs the codeceptjs testsuite
	#	clean-project			Remove all generated project files
	#	start-selenium			Starts the selenium server
	# 	stop-selenium			Stops the selenium server

build:
	@$(COMPOSE) build node
	@$(COMPOSE) run --rm node bash -c 'npm install'

shell:
	@$(COMPOSE) run --rm --service-ports node bash

test:
	@$(COMPOSE) run --rm --service-ports node bash -c 'npm test'

start-selenium:
	@$(COMPOSE) up -d selenium
	@echo "Selenium VNC server is running at 0.0.0.0:59001"

stop-selenium:
	@$(COMPOSE) stop selenium

clean-project:
	@rm -rf node_modules
	@rm -rf output/*
