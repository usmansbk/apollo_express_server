// import { ApolloError } from 'apollo-server-express';
import { DataSource } from 'apollo-datasource';

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
}
