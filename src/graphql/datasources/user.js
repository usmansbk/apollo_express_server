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
    return data;
  }

  async findByEmailAndPassword(data) {
    return { firstName: 'Usman', ...data };
  }
}
