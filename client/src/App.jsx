import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "./graphql/queries";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { productSuccess, reset } from "./redux/product/productSlice";
import ProductList from "./components/ProductList/ProductList";

const App = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.products) {
      dispatch(productSuccess(data.products));
    }
    dispatch(reset());
  }, [data]);
  console.log(data);
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default App;
