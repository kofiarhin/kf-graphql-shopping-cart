import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import mongoose from "mongoose";

const resolvers = {
  Query: {
    users: async () => {
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
    cart: async (_, args) => {
      const { user_id } = args;
      const userId = new mongoose.Types.ObjectId(user_id);
      const cart = await Cart.findOne({ user_id: userId });
      return cart;
    },
    // orders
    orders: async (_, args) => {
      const orders = await Order.find();
      return orders;
    },
  },
  Mutation: {
    addToCart: async (_, args) => {
      //check if user has car
      const { user_id, product_id, quantity } = args.addToCartInput;

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
    createOrder: async (_, args) => {
      const { user_id, orderItems } = args.createOrderInput;

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
