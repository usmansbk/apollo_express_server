/* eslint-disable no-underscore-dangle */
export default {
  MutationResponse: {
    __resolveType(obj) {
      return obj.__typename;
    },
  },
  Profile: {
    __resolveType(obj) {
      return obj.__typename;
    },
  },
};
