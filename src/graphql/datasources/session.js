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
    let session = await this.findId(data.id);
    if (session) {
      await session.update(data);
    } else {
      session = await this.store.create(data);
    }
    return session;
  }

  async findId(id) {
    const session = await this.store.findByPk(id);
    return session;
  }
}
