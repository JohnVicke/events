const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require("graphql");
const db = require("../database/database");
const UserModel = require("../database/models/usermodel");
const User = require("./user/userresolver");

const QueryRoot = new GraphQLObjectType({
  name: "Query",
  description: "this is a root query",
  fields: () => {
    return {
      users: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt,
          },
          firstName: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          return db.models.user.findAll({ where: args });
        },
      },
    };
  },
});

const MutationRoot = new GraphQLObjectType({
  name: "Mutation",
  description: "Functions to create things",
  fields: () => {
    return {
      addUser: {
        type: User,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(_, args) {
          return UserModel.create({
            firstName: args.firstName,
          });
        },
      },
    };
  },
});

const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

module.exports = Schema;
