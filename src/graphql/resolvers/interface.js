/* eslint-disable no-underscore-dangle */
import { GraphQLScalarType } from 'graphql';

export default {
  MutationResponse: {
    __resolveType(type) {
      return type.__typename;
    },
  },
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
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description: 'Represents a JavaScript Object Notation format',
    parseValue(value) {
      return JSON.parse(value);
    },
    serialize(value) {
      return JSON.stringify(value);
    },
    parseLiteral(ast) {
      return JSON.stringify(ast.value);
    },
  }),
};
