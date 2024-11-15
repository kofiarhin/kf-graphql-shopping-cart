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

  


   type CartItem {
    product_id: ID,
    quantity: Int
    product: Product
   }

  

type OrderItem {
  product_id: String!
  product: Product
}
  type Order {
    _id: ID
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
        cart: Cart
        carts: [Cart]

        # orders
        orders: [Order]
    }
   
   input OrderItemInput {
    product_id: ID!
    quantity: Int!
   }

   input CreateOrderInput {
    user_id: ID!
    orderItems: [OrderItemInput!]!
    status: String
   }

   type Login {
    _id: ID!,
    name: String!
    email: String
    token: String!
   }

   input LoginUserInput {
    email: String!
    password: String
   }

   type Cart {
    user_id: ID!
    user: User
    products: [CartItem]
    quantity: Int
  }

   input AddToCartInput {
    user_id: ID!
    product_id: ID!
    quantity: Int!
  }

  input RegisterUserInput {
    _id: ID
    name: String!
    email: String!
    password: String
  }
  
  

    type Mutation {

      #register user
      registerUser(registerUserInput: RegisterUserInput) : User

      #login user
      loginUser(loginUserInput: LoginUserInput) : Login
        # cart mutation
        addToCart(addToCartInput: AddToCartInput): Cart
        deleteCartItem(product_id: ID!): Cart

        # order mutation
        createOrder(createOrderInput: CreateOrderInput): Order
    }


`;

export default typeDefs;
