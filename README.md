# Health Declaration App

The application is hosted on http://health-declare.s3-website-ap-southeast-1.amazonaws.com/
For running locally, please refer to the instructions below.

## Tech Stack

- Frontend: React / Vite
- Backend: Node.js / Express
- Database: PostgreSQL
- Hosting: AWS EC2 / S3

## Tests

Automated e2e test were created using playwright, to run them locally:

1. cd frontend
2. npx playwright test

## Running Locally (with Docker)

1. git clone https://github.com/jackylauql/health-declaration.git
2. cd health-declaration
3. ensure docker desktop is running
4. docker compose -f docker-compose-local.yml up --build
5. open another terminal
6. cd health-declaration/backend
7. npm install
8. npx sequelize-cli db:migrate
9. npx sequelize-cli db:seed:all
10. check that the app is working at http://localhost:5173

## Running Locally (without Docker)

1. git clone https://github.com/jackylauql/health-declaration.git
2. cd health-declaration/frontend
3. npm install
4. npm run dev
5. cd health-declaration/backend
6. npm install
7. npm run dev
8. install postgresql
9. create database health_declare_db
10. ensure credentials in backend/config/config.json and backend/src/utils/db match your local credentials
11. cd health-declaration/backend
12. npx sequelize-cli db:migrate
13. npx sequelize-cli db:seed:all
14. check that the app is working at http://localhost:5173
