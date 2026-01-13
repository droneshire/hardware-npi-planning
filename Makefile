PROJECT_ID := hw-npi-planning
DATACONNECT_DIR := dataconnect/generated

update_rules:
	firebase deploy --only firestore:rules --project $(PROJECT_ID)
	firebase deploy --only storage --project $(PROJECT_ID)

update_env:
	./update_env.sh -f .env

update_sdk:
	rm -rf $(DATACONNECT_DIR)
	firebase dataconnect:sdk:generate --project $(PROJECT_ID)

deploy_schema: update_sdk
	firebase deploy --only dataconnect --project $(PROJECT_ID)

create_sdk:
	npx -y firebase-tools@latest init dataconnect:sdk --project $(PROJECT_ID)

hosting_deploy:
	firebase deploy --only hosting --project $(PROJECT_ID)

lint:
	npm run lint

format:
	npx prettier --write "src/**/*.{ts,tsx,js,jsx,json}" "dataconnect/**/*.{gql,graphql,yaml,yml}" "*.{json,md,yml,yaml}" "docs/**/*.md" --ignore-path .gitignore --ignore-path .prettierignore

format-check:
	npx prettier --check "src/**/*.{ts,tsx,js,jsx,json}" "dataconnect/**/*.{gql,graphql,yaml,yml}" "*.{json,md,yml,yaml}" "docs/**/*.md" --ignore-path .gitignore --ignore-path .prettierignore

clean:
	rm -rf $(DATACONNECT_DIR)
	rm -rf node_modules
	rm -rf dist
	rm -rf .vite

.PHONY: update_sdk deploy_schema lint format format-check clean create_sdk
