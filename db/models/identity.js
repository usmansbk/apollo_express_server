'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Identity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User } = models;
      Identity.belongsTo(User);
    }
  };
  Identity.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.STRING,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    connection: DataTypes.STRING,
    isSocial: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Identity',
  });
  return Identity;
};