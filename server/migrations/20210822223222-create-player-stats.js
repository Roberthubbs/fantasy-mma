'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlayerStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerId: {
        type: Sequelize.STRING
      },
      leagueId: {
        type: Sequelize.STRING
      },
      takedownsDefended: {
        type: Sequelize.INTEGER
      },
      takedownsAttemptedAgainst: {
        type: Sequelize.INTEGER
      },
      takedownsnsCompleted: {
        type: Sequelize.INTEGER
      },
      takedownsAttempted: {
        type: Sequelize.INTEGER
      },
      wins: {
        type: Sequelize.INTEGER
      },
      losses: {
        type: Sequelize.INTEGER
      },
      finished: {
        type: Sequelize.INTEGER
      },
      finishes: {
        type: Sequelize.INTEGER
      },
      submissions: {
        type: Sequelize.INTEGER
      },
      significantStrikes: {
        type: Sequelize.INTEGER
      },
      strikesAttempted: {
        type: Sequelize.INTEGER
      },
      strikesAbsorbed: {
        type: Sequelize.INTEGER
      },
      ko: {
        type: Sequelize.INTEGER
      },
      kod: {
        type: Sequelize.INTEGER
      },
      strikeDifferential: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PlayerStats');
  }
};