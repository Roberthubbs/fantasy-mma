'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('JoinLeagueRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requesterId: {
        type: Sequelize.INTEGER
      },
      leagueOwnerId: {
        type: Sequelize.INTEGER
      },
      leagueNameString: {
        type: Sequelize.STRING
      },
      requestMessage: {
        type: Sequelize.STRING
      },
      waitingApproval: {
        type: Sequelize.BOOLEAN
      },
      approved: {
        type: Sequelize.BOOLEAN
      },
      denied: {
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
    await queryInterface.dropTable('JoinLeagueRequests');
  }
};