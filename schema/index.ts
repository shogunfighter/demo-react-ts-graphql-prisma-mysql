import { GraphQLSchema } from 'graphql';
import USER from './user/index';

const schema = new GraphQLSchema({
  query: USER.query,
});

export default schema;