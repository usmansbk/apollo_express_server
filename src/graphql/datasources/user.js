/* eslint-disable class-methods-use-this */
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
    return { firstName: 'Usman', ...data };
  }
}
