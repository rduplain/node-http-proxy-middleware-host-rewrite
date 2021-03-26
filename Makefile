all: start

# Top-Level Recipes
start: npm-install npm-start | node-command

clean:
	git clean -fdx


# Implementation Details
npm-%: npm-command
	npm $*

npm-install: .npm-install
	true # Override wildcard recipe.

.npm-install: package.json | npm-command
	npm install
	npm ls --depth=0
	touch $@

%-command:
	command -v $* >/dev/null || ( echo "Requires '$*' command."; false )

.SILENT:
