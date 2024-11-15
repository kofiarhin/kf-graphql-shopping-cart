import "./cartList.styles.scss";
import { Link } from "react-router-dom";

const CartList = ({ data }) => {
  return (
    <div>
      <div className="cart-wrapper">
        {data.map((item) => {
          return (
            <div key={item.product_id} className="cart-unit">
              <Link to={`/products/${item.product_id}`}>
                <img src={item.product.img} alt="" />
              </Link>
              <Link to={`/products/${item.product_id}`}>
                {" "}
                <p> {item.product.name} </p>
                <p>Quantity: {item.quantity} </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartList;
