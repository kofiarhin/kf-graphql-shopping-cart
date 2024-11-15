import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CART_ITEM } from "../../graphql/mutations";
import { cartSuccess } from "../../redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteCartItem] = useMutation(DELETE_CART_ITEM);
  const handleDeleteItem = async () => {
    try {
      const { data } = await deleteCartItem({
        variables: {
          product_id: item.product_id,
        },
      });
      dispatch(cartSuccess(data.deleteCartItem.products));
    } catch (error) {}
  };
  return (
    <>
      <div key={item.product_id} className="cart-unit">
        <FaTrash color="red" className="trash" onClick={handleDeleteItem} />
        <Link to={`/products/${item.product_id}`}>
          <img src={item.product.img} alt="" />
        </Link>
        <Link to={`/products/${item.product_id}`}>
          {" "}
          <p> {item.product.name} </p>
          <p>Quantity: {item.quantity} </p>
        </Link>
      </div>
    </>
  );
};

export default CartItem;
