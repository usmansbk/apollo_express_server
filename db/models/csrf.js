'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Csrf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Csrf.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    refreshToken: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Csrf',
  });
  return Csrf;
};