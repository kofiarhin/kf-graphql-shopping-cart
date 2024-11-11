import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolver.js";
import connectDB from "./config/db.js";
import { testDatabase, clearCart } from "./utils/helper.js";
import reset from "./utils/reset.js";

// connect to database
connectDB();

// reset database
// reset();

// clearCart();
// test database
// testDatabase();

const server = new ApolloServer({
  //typeDefs
  typeDefs,
  resolvers,
  // resolvers
});

const { uri } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 5000 },
});

console.log("server started");
