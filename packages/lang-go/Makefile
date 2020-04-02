# Basic go commands
GOCMD=go

GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
GORUN=$(GOCMD) run

# Binary names
BINARY_NAME=mybinary

# Env
include .env
export $(shell sed 's/=.*//' .env)

dev:
	air

start:
	$(GORUN) ./main.go

build:
	$(GOBUILD)

graphql:
	$(GORUN) github.com/99designs/gqlgen generate

smth:
	echo $(PORT)
