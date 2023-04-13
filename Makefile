install: 
	npm install
	

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish 

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js

.PHONY: test