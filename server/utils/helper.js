import Product from "../models/productModel.js";
export const testDatabase = async () => {
  console.log("test database");

  const products = await Product.find();
  console.log(products);
};
