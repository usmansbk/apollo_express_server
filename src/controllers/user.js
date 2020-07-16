export default class User {
  static getUserById(_parent, args, context) {
    return ({
      id: args.id + context.me?.id,
    });
  }

  static me() {
    return null;
  }

  static email() {
    return 'usmansbk@gmail.com';
  }
}
