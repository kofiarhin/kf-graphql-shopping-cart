import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Header from "./components/Header/Header";
import Profile from "./Pages/Profile/Profile";
import Product from "./Pages/Product/Product";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS, GET_CART } from "./graphql/queries";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productSuccess, reset } from "./redux/product/productSlice";
import { cartSuccess, resetCart } from "./redux/cart/cartSlice";
import Cart from "./Pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Success from "./Pages/Success/Success";
import Orders from "./Pages/Orders/Orders";

// app
const App = () => {
  const dispatch = useDispatch();
  const { loading, error, data: productData } = useQuery(GET_PRODUCTS);
  const { user } = useSelector((state) => state.auth);
  const { data: cartData } = useQuery(GET_CART);

  useEffect(() => {
    if (user && cartData?.cart) {
      dispatch(cartSuccess(cartData.cart.products));
    }

    if (productData?.products) {
      dispatch(productSuccess(productData.products));
    }
    dispatch(resetCart());
  }, [user, cartData, productData]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
};

export default App;
