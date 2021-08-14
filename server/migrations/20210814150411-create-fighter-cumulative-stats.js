'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FighterCumulativeStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fighterId: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.STRING
      },
      reach: {
        type: Sequelize.STRING
      },
      stance: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      slpm: {
        type: Sequelize.STRING
      },
      slaccuracy: {
        type: Sequelize.STRING
      },
      sapminute: {
        type: Sequelize.STRING
      },
      strdef: {
        type: Sequelize.STRING
      },
      strdef: {
        type: Sequelize.STRING
      },
      tdavg: {
        type: Sequelize.STRING
      },
      tdacc: {
        type: Sequelize.STRING
      },
      tddef: {
        type: Sequelize.STRING
      },
      subattperfifteen: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      record: {
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
    await queryInterface.dropTable('FighterCumulativeStats');
  }
};