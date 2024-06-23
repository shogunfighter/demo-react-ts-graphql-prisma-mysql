// import {
//   GraphQLObjectType,
//   GraphQLList,
//   GraphQLInt,
//   GraphQLString,
//   GraphQLNonNull,
//   GraphQLInputObjectType,
// } from "graphql";
// import { TDataType } from "./type";



// // import USER_DATA_RECORDS from "../../mock/MOCK_DATA.json";
// // const USER_DATA_RECORDS: TDataType[] = require("../../mock/MOCK_DATA.json");

// const userType = new GraphQLObjectType({
//   name: "User",
//   fields: () => ({
//     id: { type: GraphQLInt },
//     firstName: { type: GraphQLString },
//     lastName: { type: GraphQLString },
//     email: { type: GraphQLString },
//     password: { type: GraphQLString },
//   }),
// });

// const userQuery = new GraphQLObjectType({
//   name: "UserQuery",
//   fields: {
//     users: {
//       type: new GraphQLList(userType),
//       args: {
//         ids: { type: new GraphQLList(GraphQLInt) },
//       },
//       resolve: (_, { ids }, { USER_DATA_RECORDS }) =>
//         ids
//           ? USER_DATA_RECORDS.filter((user) => ids.includes(user.id))
//           : USER_DATA_RECORDS,
//     },
//     user: {
//       type: userType,
//       args: { id: { type: GraphQLInt } },
//       resolve: (_, { id }, { USER_DATA_RECORDS }) => USER_DATA_RECORDS.find((user) => user.id === id),
//     },
//   },
// });

// // Defines the root mutation to be used in GraphQL schema
// const userMutation = new GraphQLObjectType({
//   name: "UserMutation",
//   fields: () => ({
//     // Creates a new user
//     createUser: {
//       type: userType,
//       args: {
//         input: {
//           type: new GraphQLNonNull(
//             new GraphQLInputObjectType({
//               name: "CreateUserInput",
//               fields: {
//                 firstName: { type: new GraphQLNonNull(GraphQLString) },
//                 lastName: { type: new GraphQLNonNull(GraphQLString) },
//                 email: { type: new GraphQLNonNull(GraphQLString) },
//                 password: { type: new GraphQLNonNull(GraphQLString) },
//               },
//             })
//           ),
//         },
//       },
//       resolve: (_, { input }, { USER_DATA_RECORDS }) => {
//         const newUser: TDataType = {
//           id: USER_DATA_RECORDS.length + 1,
//           ...input,
//         };
//         USER_DATA_RECORDS.push(newUser);
//         return newUser;
//       },
//     },
//     // Updates an existing user
//     updateUser: {
//       type: userType,
//       args: {
//         input: {
//           type: new GraphQLNonNull(
//             new GraphQLInputObjectType({
//               name: "UpdateUserInput",
//               fields: {
//                 id: { type: new GraphQLNonNull(GraphQLInt) },
//                 firstName: { type: GraphQLString },
//                 lastName: { type: GraphQLString },
//                 email: { type: GraphQLString },
//                 password: { type: GraphQLString },
//               },
//             })
//           ),
//         },
//       },
//       resolve: (_, { input }, { USER_DATA_RECORDS }) => {
//         const user = USER_DATA_RECORDS.find((user) => user.id === input.id);
//         if (!user) return null;
//         return { ...user, ...input };
//       },
//     },
//     // Deletes a user based on their id
//     deleteUser: {
//       type: userType,
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLInt) },
//       },
//       resolve: (_, { id }, { USER_DATA_RECORDS }) => {
//         const deletedUser = USER_DATA_RECORDS.splice(
//           USER_DATA_RECORDS.findIndex((user) => user.id === id),
//           1
//         )[0];
//         return deletedUser || null;
//       },
//     },
//   }),
// });

// export default { type: userType, query: userQuery, mutation: userMutation };


import userMutation from "./mutation";
import userQuery from "./query";
import userType from "./type";

export default { type: userType, query: userQuery, mutation: userMutation };