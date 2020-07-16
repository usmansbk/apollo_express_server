export default {
  Mutation: {
    signIn: () => ({
      code: '200',
      success: true,
      message: 'Login successful',
      user: {
        id: 1,
        firstName: 'usman',
        lastName: 'suleiman',
      },
      token: '1234',
    }),
    signUp: () => null,
    socialLogin: () => null,
  },
};
