export default {
  Query: {
    user: (_parent, args, context) => ({
      id: args.id + context.me?.id,
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
