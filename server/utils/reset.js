import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
import bcrypt from "bcryptjs";

const reset = async () => {
  // delete users
  await User.deleteMany();

  //   delete Products
  await Product.deleteMany();

  //   create users
  await Promise.all(
    users.map(async (user) => {
      const { name, email, password } = user;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
    })
  );

  //   create products
  await Promise.all(
    products.map(async (product) => {
      await Product.create({ ...product });
    })
  );

  const productData = await Product.find();
  console.log(productData);

  console.log("database reset");
};

export default reset;
