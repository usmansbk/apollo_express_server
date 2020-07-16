/* eslint-disable no-underscore-dangle */
export default {
  MutationResponse: {
    __resolveType(type) {
      return type.__typename;
    },
  },
};
