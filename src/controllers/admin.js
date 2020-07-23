import { BadRequest, Unauthorized, Forbidden } from '../helpers/errors';

export default class Admin {
  static async createUser(_source, args, context) {
    const { input } = args;
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const currentUser = await dataSources.user.findById(me.id);
      if (!(currentUser && currentUser?.roles.includes('ADMIN'))) {
        return Forbidden('Not permitted');
      }

      const user = await dataSources.user.create(input);
      return {
        code: 201,
        message: 'User created',
        success: true,
        user,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static async updateUser(_source, args, context) {
    const { input } = args;
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const currentUser = await dataSources.user.findById(me.id);
      if (!(currentUser && currentUser?.roles.includes('ADMIN'))) {
        return Forbidden('Not permitted');
      }

      const user = await dataSources.user.update({ id: input.id }, input);
      return {
        code: 200,
        message: 'User updated',
        success: true,
        user,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static async deleteUser(_source, args, context) {
    const { id } = args;
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const currentUser = await dataSources.user.findById(me.id);
      if (!(currentUser && currentUser?.roles.includes('ADMIN'))) {
        return Forbidden('Not permitted');
      }

      const user = await dataSources.user.delete(id);
      return {
        code: 204,
        message: 'User deleted',
        success: true,
        user,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static batchCreateUser() {
  }

  static batchUpdateUser() {
  }

  static batchDeleteUser() {
  }

  static makeAdmin() {
  }

  static removeAdmin() {
  }
}
