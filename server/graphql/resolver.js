import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import mongoose from "mongoose";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/helper.js";

const resolvers = {
  Query: {
    users: async (_, args, context) => {
      const users = await User.find();
      return users;
    },
    products: async () => {
      const products = await Product.find();
      return products;
    },
    product: async (_, { id }) => {
      const product = await Product.findById(id);
      return product;
    },
    cart: async (_, args, context) => {
      if (!context.user) {
        throw new GraphQLError("Authorized Access", {
          extensions: {
            code: "UNAUTHORIZED ACCESS",
          },
        });
      }
      const { _id: user_id } = context.user;
      // const { user_id } = args;
      const userId = new mongoose.Types.ObjectId(user_id);
      const cart = await Cart.findOne({ user_id: userId });
      return cart;
    },
    carts: async (_, args, context) => {
      if (!context.user) {
        throw new GraphQLError("you are not authorized", {
          extensions: {
            code: "UNAUTHORIZED ACCESS",
          },
        });
      }
      const carts = await Cart.find();
      return carts;
    },
    // orders
    orders: async (_, args, context) => {
      if (!context.user) {
        throw new GraphQLError("you are not authorized", {
          extensions: { code: "UNAUTHORIZED ACCESS" },
        });
      }

      const { _id: user_id } = context.user;

      const orders = await Order.find({ user_id });
      return orders;
    },
  },
  Mutation: {
    // register user
    registerUser: async (_, args) => {
      const { name, email, password } = args.registerUserInput;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      const { password: userPassword, ...rest } = user._doc;
      return { ...rest };
    },
    // login user
    loginUser: async (_, args) => {
      const { email, password } = args.loginUserInput;
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("Invalid credentials", {
          extensions: {
            code: "INVALID CREDENTIALS",
          },
        });
      }
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        throw new GraphQLError("Invalid password", {
          extensions: {
            code: "Password Invalid",
          },
        });
      }

      const token = generateToken(user._id);

      const { password: userPasswowrd, ...rest } = user._doc;
      return { ...rest, token };
    },
    deleteCartItem: async (_, args, context) => {
      const { _id: user_id } = context.user;
      const { product_id } = args;
      const cart = await Cart.updateOne(
        { user_id },
        {
          $pull: { products: { product_id } },
        },
        { new: true }
      );

      const updatedCart = await Cart.findOne({ user_id });
      return updatedCart;
    },
    addToCart: async (_, args, context) => {
      if (!context.user) {
        throw new GraphQLError("you are not authorized", {
          extensions: {
            code: "UNAUTHORIZED ACCESS",
          },
        });
      }
      const { _id: user_id } = context.user;
      //check if user has car
      const { product_id, quantity } = args.addToCartInput;

      const foundCart = await Cart.findOne({ user_id });

      if (!foundCart) {
        const cart = await Cart.create({
          user_id,
          products: [{ product_id, quantity }],
        });
        return cart;
      }

      // update cart items
      const { _id } = foundCart;

      const updatedCart = await Cart.findByIdAndUpdate(
        _id,
        {
          $push: { products: { product_id, quantity } },
        },
        { new: true }
      );

      return updatedCart;
    },
    createOrder: async (_, args, context) => {
      if (!context.user) {
        throw new GraphQLError("you are not authorized", {
          extensions: {
            code: "UNAUTHORIZED ACCESS",
          },
        });
      }

      const { _id: user_id } = context.user;
      const { orderItems } = args.createOrderInput;

      // clear cart
      await Cart.findOneAndDelete({ user_id });

      const order = await Order.create({
        user_id,
        orderItems,
      });
      return order;
    },
  },
  CartItem: {
    product: async (parent) => {
      const product = await Product.findById(parent.product_id);
      return product;
    },
  },

  Cart: {
    user: async (parent) => {
      const user = await User.findById(parent.user_id);
      return user;
    },
  },
  OrderItem: {
    product: async (parent) => {
      const product = await Product.findById(parent.product_id);
      return product;
    },
  },

  Order: {
    user: async (parent) => {
      const user = await User.findById(parent.user_id);
      return user;
    },
  },
};

export default resolvers;
