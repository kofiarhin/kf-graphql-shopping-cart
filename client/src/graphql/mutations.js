import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LoginUserMutation($loginUserInput: LoginUserInput) {
    loginUser(loginUserInput: $loginUserInput) {
      _id
      name
      email
      token
    }
  }
`;

const REGISTER_USER = gql`
  mutation RegisterUserMutation($registerUserInput: RegisterUserInput) {
    registerUser(registerUserInput: $registerUserInput) {
      name
      email
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCartMutation($addToCartInput: AddToCartInput) {
    addToCart(addToCartInput: $addToCartInput) {
      user_id
      products {
        product_id
        product {
          _id
          name
          description
          price
        }
      }
    }
  }
`;
const CREATE_ORDER = gql`
  mutation CreateOrderMutation($createOrderInput: CreateOrderInput) {
    createOrder(createOrderInput: $createOrderInput) {
      user_id
      orderItems {
        product_id
      }
    }
  }
`;
export { LOGIN_USER, REGISTER_USER, ADD_TO_CART, CREATE_ORDER };
