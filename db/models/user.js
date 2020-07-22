const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const {
  Model, Sequelize,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get fullName() {
      return [this.firstName, this.lastName].join(' ');
    }

    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }

    static associate(models) {
      const { Identity } = models;
      User.hasMany(Identity);
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUID4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.ENUM('USER', 'ADMIN')),
      allowNull: false,
      defaultValue: ['USER']
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        min: 8,
      },
      set(value) {
        const password = bcrypt.hashSync(value, 10);
        this.setDataValue('password', password);
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user => {
    user.id = uuid();
  });
  return User;
};
