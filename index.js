const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { initDB } = require('./db');

const startServer = async () => {
  await initDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.listen({ port: 6000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

startServer();