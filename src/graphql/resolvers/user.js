export default {
  Query: {
    user: () => ({
      id: 1,
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
