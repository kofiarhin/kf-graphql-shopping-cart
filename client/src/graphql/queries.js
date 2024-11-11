import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProductsQuery {
    products {
      name
      description
      price
      img
      _id
    }
  }
`;

export { GET_PRODUCTS };
