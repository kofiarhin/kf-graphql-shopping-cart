import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./gql/schema.js";
import resolvers from "./gql/resolver.js";
import connectDB from "./config/db.js";
import { testDatabase } from "./utils/helper.js";

// connect to database
connectDB();

// test database
testDatabase();

const server = new ApolloServer({
  //typeDefs
  typeDefs,
  resolvers,
  // resolvers
});

const { uri } = await startStandaloneServer(server, {
  listen: { port: 5000 },
});

console.log("server started");
