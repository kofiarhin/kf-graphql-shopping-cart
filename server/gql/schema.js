const typeDefs = `#graphql

    type User {
        name: String
        email: String
        password: String
    }

    type Query {
        users: [User]
    }

`;

export default typeDefs;
