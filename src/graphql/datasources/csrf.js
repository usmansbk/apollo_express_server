import { DataSource } from 'apollo-datasource';

export default class CsrfAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async create(data) {
    let csrf = await this.findById(data.id);
    if (csrf) {
      await csrf.update(data);
    } else {
      csrf = await this.store.create(data);
    }
    return csrf;
  }

  async findById(id) {
    const csrf = await this.store.findByPk(id);
    return csrf;
  }

  async delete(id) {
    const csrf = await this.findById(id);
    if (csrf) {
      await csrf.destroy();
      return true;
    }
    throw new Error('Forbidden');
  }
}
