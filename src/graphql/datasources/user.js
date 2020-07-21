/* eslint-disable class-methods-use-this */
import { DataSource } from 'apollo-datasource';
import { v4 as uuid } from 'uuid';

export default class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async create(data) {
    const user = await this.store.create(data);
    return user;
  }

  createFromSocial(data) {
    return { id: uuid(), ...data };
  }

  findBySocialId(data) {
    return { id: uuid(), ...data };
  }

  async findByEmailAndPassword(data) {
    const user = await this.store.findOne({ where: { email: data.email } });
    if (!(user && await user.comparePassword(data.password))) {
      throw new Error('Incorrect email or password');
    }
    return user;
  }

  async findById(id) {
    const user = await this.store.findByPk(id);
    return user;
  }

  async updateEmail(me, data) {
    const user = await this.findById(me.id);
    if (user.email !== data.currentEmail) {
      throw new Error('Forbidden');
    }
    user.email = data.newEmail;
    await user.save();
    await user.reload();
    return user;
  }

  async updatePassword(me, data) {
    const user = await this.findById(me.id);
    if (!user) {
      throw new Error('User does not exist');
    }

    user.password = data.newPassword;
    await user.save();
    await user.reload();
    return user;
  }

  async verifyEmail(me) {
    const user = await this.findById(me.id);
    if (!user) {
      throw new Error('User does not exist');
    }

    user.emailVerified = true;
    await user.save();
    await user.reload();
    return user;
  }

  async delete(id) {
    const user = await this.findById(id);
    if (user) {
      await user.destroy();
      return true;
    }
    throw new Error('Account already deleted');
  }

  async updateDetails(me, values) {
    const user = await this.findById(me.id);
    if (user) {
      const updated = await user.update(values);
      return updated;
    }
    throw new Error('User not found');
  }
}
