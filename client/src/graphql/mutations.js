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

export { LOGIN_USER}