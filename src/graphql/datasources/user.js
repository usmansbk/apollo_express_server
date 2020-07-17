/* eslint-disable class-methods-use-this */
import { ApolloError } from 'apollo-server-express';
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
      throw new ApolloError('Incorrect email or password', 403);
    }
    return user;
  }
}
