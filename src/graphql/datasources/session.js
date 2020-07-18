import { DataSource } from 'apollo-datasource';

export default class SessionAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async create(data) {
    const user = await this.store.findOrCreate({
      where: {
        id: data.id,
      },
      defaults: data,
    });
    return user;
  }

  async findId(id) {
    const session = await this.store.findByPk(id);
    return session;
  }
}
