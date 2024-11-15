import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../../graphql/queries";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./product.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART } from "../../graphql/mutations";
import { GET_CART } from "../../graphql/queries";
import { cartSuccess } from "../../redux/cart/cartSlice";

const Product = () => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART }],
  });
  const [formData, setFormData] = useState({
    size: "",
    quantity: 1,
  });
  const { size, quantity } = formData;
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });
  if (loading) {
    return (
      <div>
        <h1 className="heading">Loading....</h1>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      user_id: user._id,
      product_id: id,
      quantity: parseInt(quantity),
    };
    try {
      const { data } = await addToCart({
        variables: {
          addToCartInput: {
            ...dataToSubmit,
          },
        },
      });
      dispatch(cartSuccess(data.addToCart.products));
      navigate("/cart");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (data && data?.product) {
    return (
      <div className="container">
        <div className="product-wrapper">
          <div className="img-container">
            <img src={data.product.img} alt="" />
          </div>
          <div className="details-wrapper">
            <h2> {data.product.name} </h2>
            <p> {data.product.description} </p>
            <p> £ {data.product.price.toFixed(2)} </p>

            {user ? (
              <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <label htmlFor="size">Size: </label>
                  <select name="size" id="size" onChange={handleChange}>
                    <option value="">--Select Size--</option>
                    {data.product.sizes.map((size) => {
                      return <option> {size} </option>;
                    })}
                  </select>
                  <input
                    type="text"
                    name="quantity"
                    placeholder="quantity"
                    value={quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="button-wrapper">
                  <button type="submit">Add To Cart</button>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
};

export default Product;
