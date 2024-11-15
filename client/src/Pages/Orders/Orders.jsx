import { GET_ORDERS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const Orders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);

  console.log(data);
  return <div>Orders</div>;
};

export default Orders;
