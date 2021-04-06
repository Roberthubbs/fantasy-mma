'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Leagues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leagueIdString: {
        type: Sequelize.STRING
      },
      leagueStartDate: {
        type: Sequelize.DATE
      },
      leagueEndDate: {
        type: Sequelize.DATE
      },
      eventTotal: {
        type: Sequelize.INTEGER
      },
      playerTotal: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Leagues');
  }
};