import { useSelector } from "react-redux";

const ProductList = () => {
  const { products } = useSelector((state) => state.product);

  return (
    <div>
      <h1 className="heading">Product List</h1>
      {products.map((product) => (
        <div key={product._id}>
          <p>{product.name}</p>
          <img src={product.img} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
