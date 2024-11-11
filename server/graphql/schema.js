const typeDefs = `#graphql

    type User {
        _id: ID!
        name: String
        email: String
        password: String
    }

    
    type Product {
        _id: String
        name: String!
        description: String!
        price: Float
        img: String
        sizes: [String]
        category: String
    }

  
    input AddToCartInput {
    user_id: ID!
    product_id: ID!
    quantity: Int!
  }

   type CartItem {
    product_id: ID,
    quantity: Int
    product: Product
   }

  type Cart {
    user_id: ID!
    user: User
    products: [CartItem]
  }

type OrderItem {
  product_id: String!
  product: Product
}
  type Order {
    _id: ID!
    user_id: String!
    user: User
    orderItems: [OrderItem!]!
    status: String!
  }

  type Query {
        # user query
        users: [User]

        # product query
        products: [Product]
        product(id: ID!): Product

        # cart query
        cart(user_id: ID!): Cart

        # orders
        orders: [Order]
    }
   
   input OrderItemInput {
    product_id: ID!
   }
   input CreateOrderInput {
    user_id: ID!
    orderItems: [OrderItemInput!]!
    status: String
   }

    type Mutation {
        # cart mutation
        addToCart(addToCartInput: AddToCartInput): Cart

        # order mutation
        createOrder(createOrderInput: CreateOrderInput): Order
    }


`;

export default typeDefs;
