lint:
	npx eslint .

start-front:
	npm run build

start-back:
	npm start

start:
	make start-front & make start-back

deploy:
	git push heroku main