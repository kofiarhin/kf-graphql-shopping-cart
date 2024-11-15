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
const GET_PRODUCT = gql`
  query GetProductQuery($id: ID!) {
    product(id: $id) {
      name
      description
      price
      img
      sizes
    }
  }
`;

const GET_CART = gql`
  query CartQuery {
    cart {
      user_id
      products {
        product_id
        quantity
        product {
          name
          img
          description
        }
      }
    }
  }
`;

const GET_ORDERS = gql`
  query OrdersQuery {
    orders {
      _id
      user_id
      user {
        name
        email
      }
      orderItems {
        product_id
        product {
          name
        }
      }
    }
  }
`;

export { GET_PRODUCTS, GET_PRODUCT, GET_CART, GET_ORDERS };
