import { GraphQLScalarType } from 'graphql';

export default {
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
