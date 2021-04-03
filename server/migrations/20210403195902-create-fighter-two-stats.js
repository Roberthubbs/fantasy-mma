'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FighterTwoStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fighterId: {
        type: Sequelize.INTEGER
      },
      fightHappenedOn: {
        type: Sequelize.DATE
      },
      takedownAttempted: {
        type: Sequelize.INTEGER
      },
      takedownCompleted: {
        type: Sequelize.INTEGER
      },
      takedownAttemptAgainst: {
        type: Sequelize.INTEGER
      },
      takedownAttemptDefended: {
        type: Sequelize.INTEGER
      },
      strikesAttempted: {
        type: Sequelize.INTEGER
      },
      strikesLanded: {
        type: Sequelize.INTEGER
      },
      significantLanded: {
        type: Sequelize.INTEGER
      },
      significantTaken: {
        type: Sequelize.INTEGER
      },
      totalStrikesTaken: {
        type: Sequelize.INTEGER
      },
      finshed: {
        type: Sequelize.BOOLEAN
      },
      won: {
        type: Sequelize.BOOLEAN
      },
      wonByKO: {
        type: Sequelize.BOOLEAN
      },
      wonBySUB: {
        type: Sequelize.BOOLEAN
      },
      lostBySub: {
        type: Sequelize.BOOLEAN
      },
      lostByKO: {
        type: Sequelize.BOOLEAN
      },
      lost: {
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
    await queryInterface.dropTable('FighterTwoStats');
  }
};