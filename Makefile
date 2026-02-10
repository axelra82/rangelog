######################################################
## Defaults
######################################################

# Make defaults from https://tech.davis-hansson.com/p/make/
SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

######################################################
# Help
######################################################

.DEFAULT_GOAL: help
.PHONY: help

help: ## Print this help message
	@grep -h -E '^[^\.]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

######################################################
## Cleaning & Setup
######################################################

.PHONY: clean setup install update-all-latest

clean: ## Cleanup generated files
	pnpm run clean
	rm -rf node_modules
	rm -f pnpm-lock.yaml

pnpm-lock.yaml:
	@pnpm install --lockfile-only

node_modules: package.json pnpm-lock.yaml
	@pnpm install

setup: .npmrc node_modules

install: pnpm install

update-all-latest: pnpm up --latest

######################################################
## Running & testing
######################################################

.PHONY: dev lint test

dev: setup
	pnpm run serve

test: setup
	pnpm run test

######################################################
## TBD - Release
######################################################

# .PHONY: release

# release:
# 	@./scripts/release.sh
