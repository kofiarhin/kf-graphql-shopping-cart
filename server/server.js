import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolver.js";
import connectDB from "./config/db.js";
import { testDatabase, clearCart } from "./utils/helper.js";
import reset from "./utils/reset.js";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";

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
  context: async ({ req }) => {
    if (req.headers?.authorization) {
      const token = req.headers.authorization;
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        const { password, ...rest } = user._doc;

        return { user: { ...rest } };
      } catch (error) {
        console.log(error.message);
        return null;
      }
    }
  },
  listen: { port: process.env.PORT || 5000 },
});

console.log("server started");
