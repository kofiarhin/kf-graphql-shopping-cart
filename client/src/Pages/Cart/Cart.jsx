import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartList from "../../components/CartList/CartList";
import "./cart.styles.scss";
import PlaceOrderButton from "../../components/PlaceORderButton/PlaceOrderButton";
// cart page
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    console.log("place order");
  };

  return (
    <div className="container cart">
      {cart && cart.length > 0 && (
        <>
          <CartList data={cart} />
          <PlaceOrderButton />
        </>
      )}
    </div>
  );
};

export default Cart;
