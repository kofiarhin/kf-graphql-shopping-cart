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

export { LOGIN_USER, REGISTER_USER };
