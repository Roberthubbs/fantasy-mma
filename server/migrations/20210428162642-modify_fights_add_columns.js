'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'FighterOneStats', // table name
        'champWin', // new field name
        {
          champWin: Sequelize.BOOLEAN,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'FighterOneStats', // table name
        'bonusWin', // new field name
        {
          bonusWin: Sequelize.BOOLEAN,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'FighterOneStats', // table name
        'opponentRank', // new field name
        {
          opponentRank: Sequelize.BOOLEAN,
          allowNull: true,
        }
      )])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
