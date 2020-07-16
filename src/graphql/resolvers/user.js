export default {
  Query: {
    user: (_parent, args) => ({
      id: args.id,
    }),
    me: () => 'me',
  },
  User: {
    firstName: () => 'usman',
    lastName: () => 'suleiman',
    email: () => 'usmansbk@gmail.com',
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
  },
};
