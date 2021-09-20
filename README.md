# Code Challenge - Coffee Shop

## Brief
A day at a coffee shop!
A customer visits a coffee shop that sells a bunch of items (e.g. beverages, sandwiches etc.).
Items have varying tax rates and some are free or offered at a discount when ordered with another item.
The customer is made aware of the order total and once he pays for it, he can wait until notified of the order completion.
You are required to describe a program that with a set of interfaces that models the above problem at hand. You need to design the DB and backend architecture and implement it. Front-end is not mandatory but your endpoints should be reachable through Postman. User should be able to see the list of available items, User should be able to order them and user should get an notification after fixed amount of time that your order is ready.

## Additional considerations  
Some considerations I took about the requirements:
- Only a single discount can be applied per order. 
- The applied discount always is the highest applicable.
- There are only two item categories: Meals and Beverages.
- There are only two discounts available:
  - Order 2 Beverages and 2 Meals, and get a 50% discount on the cheapest one of the ordered Beverages.
  - Order 5 Meals and get a 100% discount on the cheapest one of the ordered Meals.
- The order completion time is set on 20 seconds. After 20 seconds from the order confirmation, you get a notification stating that your order is ready.

## Deployed project
The project is deployed in a EC2 instance of AWS.  
Click [here](http://ec2-13-59-13-255.us-east-2.compute.amazonaws.com/) to visit the client app.

## Tech stack  
- Typescript.
- Monorepo using Lerna and Yarn workspaces.
- Client app using React.
- Server app using Nest.
- Persistence using a MongoDB Atlas cloud-hosted database.

## Project startup
- There are example env variables config files for both client and server.  
- To start the project, create the `.env` file in the root directory of `client` and `server` packages and run `yarn start:dev`.  
- There is a set of unit test suites in the `server` package. They can be run with `yarn test`.

