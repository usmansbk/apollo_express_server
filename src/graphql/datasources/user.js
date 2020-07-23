/* eslint-disable class-methods-use-this */
import { DataSource } from 'apollo-datasource';
import { nanoid } from 'nanoid';

export default class UserAPI extends DataSource {
  constructor({ store, Identity }) {
    super();
    this.store = store;
    this.identity = Identity;
  }

  initialize(config) {
    this.context = config.context;
  }

  async create(data) {
    const user = await this.store.create(data);
    return user;
  }

  async createFromSocialIdentity(data) {
    const [input, identity] = data;
    let user = await this.store.findOne({ where: { email: input.email } });
    if (!user) {
      user = await this.create({ ...input, password: nanoid(), verifieidEmail: true });
    }
    if (!user.verifieidEmail) {
      user.verifieidEmail = true;
      await user.save();
      await user.reload();
    }
    const socialIdentity = await this.identity.create({ ...identity, UserId: user.id });
    await user.addIdentity(socialIdentity);
    return user;
  }

  async findBySocialIdentity(data) {
    const [input, identity] = data;
    const user = await this.store.findOne({
      where: { email: input.email },
      include: {
        association: 'Identities',
        where: {
          clientId: identity.clientId,
          provider: identity.provider,
        },
      },
    });
    return user;
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
