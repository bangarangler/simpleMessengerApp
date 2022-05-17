// I would typically build the backend with TypeScript as well but wanted to
// show javascript familiarity along with more modern typescript knowledge which
// is used on the client side.  If I wasn't trying to plow through this I would
// do all of it in typescript and use graphql-codegen to generate types and
// hooks for the frontend based off of the schema (have more elaborate projects
// I've worked on and architected that implemented this and it's a true joy to work in.).
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const start = async () => {
  const app = express();

  // opted to not set up cors, cookies, auth, etc as this is just a simple POC
  // to be ran locally.  DB is also open so shouldn't be any issues using it.

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  );
  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });
  mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true });

  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
};

start();
