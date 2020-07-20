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
      // define association here
    }
  };
  Identity.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    provider: DataTypes.STRING,
    connection: DataTypes.STRING,
    isSocial: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Identity',
  });
  return Identity;
};