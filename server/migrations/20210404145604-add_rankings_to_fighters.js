'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return Promise.all([
    //   queryInterface.addColumn(
    //     'Fighters', // table name
    //     'ranking', // new field name
    //     {
    //       type: Sequelize.INTEGER,
    //       allowNull: true,
    //     }
    //   ),
    //   queryInterface.addColumn(
    //     'Fighters', // table name
    //     'nextOpponent', // new field name
    //     {
    //       type: Sequelize.STRING,
    //       allowNull: true,
    //     }
    //   ),
    //   queryInterface.addColumn(
    //     'Fighters', // table name
    //     'losses', // new field name
    //     {
    //       type: Sequelize.STRING,
    //       allowNull: true,
    //     }
    //   )
    // ])
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
