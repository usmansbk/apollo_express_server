import { GraphQLScalarType, Kind } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date as a string value in ISO format',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
  JSON: GraphQLJSON,
};
