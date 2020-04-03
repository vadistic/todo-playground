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
export PORT=8000
export VERSION=0.1.0
export LOG_LEVEL=INFO
export PKG_NAME=todo-lang-go

# include .env
# export $(shell sed 's/=.*//' .env)

dev:
	air

start:
	$(GORUN) ./main.go

build:
	$(GOBUILD) ./main.go

graphql:
	$(GORUN) github.com/99designs/gqlgen generate

test:
	$(GOTEST) ./...
