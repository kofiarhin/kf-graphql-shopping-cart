import "./cartList.styles.scss";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const CartList = ({ data }) => {
  useEffect(() => {}, [data]);
  return (
    <div>
      <div className="cart-wrapper">
        {data.map((item) => {
          return <CartItem item={item} key={item.product_id} />;
        })}
      </div>
    </div>
  );
};

export default CartList;
