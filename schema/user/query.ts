import { GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import userType, { TDataType } from "./type";

const userQuery = new GraphQLObjectType({
  name: "UserQuery",
  fields: {
    users: {
      type: new GraphQLList(userType),
      args: {
        ids: { type: new GraphQLList(GraphQLInt) },
      },
      resolve: (_, { ids }, { USER_DATA_RECORDS }) =>
        ids
          ? USER_DATA_RECORDS.filter((user: TDataType) => ids.includes(user.id))
          : USER_DATA_RECORDS,
    },
    user: {
      type: userType,
      args: { id: { type: GraphQLInt } },
      resolve: (_, { id }, { USER_DATA_RECORDS }) =>
        USER_DATA_RECORDS.find((user: TDataType) => user.id === id),
    },
  },
});

export default userQuery;
