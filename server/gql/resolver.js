const resolvers = {
  Query: {
    users: () => {
      return [
        {
          name: "kofi arhin",
          email: "kofiarhin@gmail.com",
          password: "password",
        },
      ];
    },
  },
};

export default resolvers;
