import { GraphQLScalarType } from 'graphql';

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date as a string value in ISO format',
    parseValue(value) {
      console.log('parse', value);
      return new Date(value).getTime() / 1000;
    },
    serialize(value) {
      console.log('serial', value);
      return String(new Date(value).getTime() / 1000);
    },
    parseLiteral(ast) {
      console.log('pl', ast.value);
      return String(new Date(ast.value).getTime() / 1000);
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
