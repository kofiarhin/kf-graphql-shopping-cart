import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./productList.styles.scss";

const ProductList = () => {
  const { products } = useSelector((state) => state.product);

  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product._id}>
          <Link to={`/products/${product._id}`}>
            <img src={product.img} alt="" />
          </Link>
          <Link to={`/products/${product._id}`}>
            <p>{product.name}</p>
          </Link>
          <p> £{product.price.toFixed(2)} </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
