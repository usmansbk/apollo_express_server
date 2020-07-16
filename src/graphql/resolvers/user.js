export default {
  Query: {
    user: () => ({
      id: 1,
      firstName: 'usman',
      lastName: 'suleiman',
      email: 'usmansbk@gmail.com',
      createdAt: new Date(),
    }),
    me: () => 'me',
  },
};
