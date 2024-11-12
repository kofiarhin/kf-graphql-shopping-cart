import Product from "../models/productModel.js";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";
import products from "./data/products.js";
import users from "./data/users.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import jwt from "jsonwebtoken";
// test database
export const testDatabase = async () => {
  const products = await Product.find();
  console.log(products);
};

export const clearCart = async () => {
  await Cart.deleteMany();
};

export const readFile = async () => {
  console.log(users);
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
