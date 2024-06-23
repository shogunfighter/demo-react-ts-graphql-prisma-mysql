import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export type TDataType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export default userType;