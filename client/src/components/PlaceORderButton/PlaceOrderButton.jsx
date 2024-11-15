import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../../graphql/mutations";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

// place order
const PlaceOrderButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [createOrder] = useMutation(CREATE_ORDER);

  // handle place order
  const handlePlaceOrder = async () => {
    try {
      const products = cart.map((item) => {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
        };
      });

      const dataToSubmit = {
        user_id: user._id,
        orderItems: products,
      };
      const { data } = await createOrder({
        variables: {
          createOrderInput: {
            user_id: user._id,
            orderItems: products,
          },
        },
      });
      dispatch(clearCart("order placed thank you!"));
      navigate("/success");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="button-wrapper">
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </>
  );
};

export default PlaceOrderButton;
