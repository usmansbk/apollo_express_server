/* eslint-disable no-underscore-dangle */
export default {
  MutationResponse: {
    __resolveType(_obj, _context, info) {
      return info.fieldName;
    },
  },
};
