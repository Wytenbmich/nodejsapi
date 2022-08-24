# Simple Order API

## About

This app is a basic api end point demonstration.
It uses express with mongodb as a database
For testing it is using Jest and Supertest.
This app uses a web deployment of mongodb for easy setup on any computer.

##
Requirements
Node js
MongoDb: password [Set in .env file]

## Dependencies
core
express
mongodb
mongoose

dev
dotenv
jest
nodemon
supertest

## Getting Started

1. Navigate to the .env file and replace the password with the password from email

2. To run tests you can use the following command 
npm run test

3. To start the server you can use the follwoing command 
npm run start 

4. To manualy test api endpoint use prefered curling method with the the api end points below

or

use VSC code's REST client and navigate to tests/apis.routes.rest

## API

There are a total of 5 endpoints, three core and two additional supporting endpoints

Core endpoints

POST /orders
GET /orders/{id}
GET /orders/{type}/{date}

Additional endpoints for testing purposes

GET /orders
DELETE /orders

## Assumptions

I have assumed a sequential id is required so have have not used mongodb default object id for orders. 
There is currently only one database so testing will wipe the data. If deployed to a production environment a seperate database would be needed for testing and development
I have coded it in a way that it is easy to change the database_url in the test file to add the new database.

## Explantion for code choice

While I am most proficient at building APIs on Ruby on Rails I choose NodeJs because setting up the environment for node js is much easier then working with Ruby.
It also made it more of a challenge and chance to use the JavaScript language in a way that was a great in terms of learning

I approached testing in a test driven way, I wrote the faiing tests first and then finished the code until the tests passed.

## References

Brief overview of topic: https://www.youtube.com/watch?v=-MTSQjw5DrM&t
Supertest: https://www.npmjs.com/package/supertest
Jest: https://jestjs.io/docs/getting-started
Mongoose: https://mongoosejs.com/docs/schematypes.html

## What I would add
I would add a seperate database for testing purposes.
I would export seed data into it's own file and extend on testing
