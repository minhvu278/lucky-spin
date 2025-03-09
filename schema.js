const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    spinLists: [SpinList!]!
  }

  type SpinList {
    id: ID!
    title: String!
    user: User!
    names: [Name!]!
  }

  type Name {
    id: ID!
    value: String!
    spinList: SpinList!
  }

  type Query {
    getUsers: [User!]!
    getSpinLists: [SpinList!]!
    getNames(spinListId: ID!): [Name!]!
    getRandomName(spinListId: ID!): Name
  }

  type Mutation {
    createUser(username: String!): User!
    createSpinList(userId: ID!, title: String!): SpinList!
    addName(spinListId: ID!, value: String!): Name!
    clearNames(spinListId: ID!): Boolean!
    spinTemporaryNames(names: [String!]!): String
  }
`;

module.exports = typeDefs;
