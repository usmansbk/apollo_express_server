'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Identities', {
      clientId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      provider: {
        type: Sequelize.STRING
      },
      connection: {
        type: Sequelize.STRING
      },
      isSocial: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Identities');
  }
};