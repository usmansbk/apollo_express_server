import { GraphQLScalarType } from 'graphql';

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'date as a string value in ISO format',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return new Date(value).toISOString();
    },
    parseLiteral(ast) {
      return new Date(ast.value).toISOString();
    },
  }),
};
