export default {
  Query: {
    user: (_parent, args, context) => ({
      id: args.id + context.me,
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
