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

  static async batchCreateUser(_source, args, context) {
    const { users: records } = args;
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const currentUser = await dataSources.user.findById(me.id);
      if (!(currentUser && currentUser?.roles.includes('ADMIN'))) {
        return Forbidden('Not permitted');
      }

      const users = await dataSources.user.bulkCreate(records);
      return {
        code: 201,
        message: 'Users created',
        success: true,
        users,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static async batchUpdateUser(_source, args, context) {
    const { users: records } = args;
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const currentUser = await dataSources.user.findById(me.id);
      if (!(currentUser && currentUser?.roles.includes('ADMIN'))) {
        return Forbidden('Not permitted');
      }

      const users = await dataSources.user.bulkUpdate(records);
      return {
        code: 200,
        message: 'Users updated',
        success: true,
        users,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static async batchDeleteUser(_source, args, context) {
    const { ids } = args;
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const currentUser = await dataSources.user.findById(me.id);
      if (!(currentUser && currentUser?.roles.includes('ADMIN'))) {
        return Forbidden('Not permitted');
      }

      const users = await dataSources.user.bulkDelete(ids);
      return {
        code: 200,
        message: 'Users deleted',
        success: true,
        users,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static async makeAdmin(_source, args, context) {
    const { email } = args;
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const currentUser = await dataSources.user.findById(me.id);
      if (!(currentUser && currentUser?.roles.includes('ADMIN'))) {
        return Forbidden('Not permitted');
      }

      const users = await dataSources.user.makeAdmin(email);
      return {
        code: 200,
        message: `${email} promoted to admin`,
        success: true,
        users,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static async removeAdmin(_source, args, context) {
    const { email } = args;
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const currentUser = await dataSources.user.findById(me.id);
      if (!(currentUser && currentUser?.roles.includes('ADMIN'))) {
        return Forbidden('Not permitted');
      }

      const users = await dataSources.user.removeAdmin(email);
      return {
        code: 200,
        message: `${email} removed from admin`,
        success: true,
        users,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }
}
