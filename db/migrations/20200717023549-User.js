'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable('Users', { 
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        phoneNumber: {
          type: Sequelize.STRING,
        },
        roles: {
          type: Sequelize.ARRAY(Sequelize.ENUM('USER', 'ADMIN')),
          allowNull: false,
        },
        emailVerified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
      await queryInterface.dropTable('Users');
  }
};
