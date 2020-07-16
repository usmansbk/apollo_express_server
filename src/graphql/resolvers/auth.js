export default {
  Mutation: {
    signIn: () => ({
      code: '200',
      success: true,
      message: 'Login successful',
      user: {
        id: 1,
      },
      token: '1234',
    }),
    signUp: () => null,
    socialLogin: () => null,
  },
};
