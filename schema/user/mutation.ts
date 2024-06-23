import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import userType, { TDataType } from "./type";

// Defines the root mutation to be used in GraphQL schema
const userMutation = new GraphQLObjectType({
  name: "UserMutation",
  fields: () => ({
    // Creates a new user
    createUser: {
      type: userType,
      args: {
        input: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: "CreateUserInput",
              fields: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
              },
            })
          ),
        },
      },
      resolve: (_, { input }, { USER_DATA_RECORDS }) => {
        const newUser: TDataType = {
          id: USER_DATA_RECORDS.length + 1,
          ...input,
        };
        USER_DATA_RECORDS.push(newUser);
        return newUser;
      },
    },
    // Updates an existing user
    updateUser: {
      type: userType,
      args: {
        input: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: "UpdateUserInput",
              fields: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
              },
            })
          ),
        },
      },
      resolve: (_, { input }, { USER_DATA_RECORDS }) => {
        const user = USER_DATA_RECORDS.find((user: TDataType) => user.id === input.id);
        if (!user) return null;
        return { ...user, ...input };
      },
    },
    // Deletes a user based on their id
    deleteUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, { id }, { USER_DATA_RECORDS }) => {
        const deletedUser = USER_DATA_RECORDS.splice(
          USER_DATA_RECORDS.findIndex((user: TDataType) => user.id === id),
          1
        )[0];
        return deletedUser || null;
      },
    },
  }),
});

export default userMutation;
