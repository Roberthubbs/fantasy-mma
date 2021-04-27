'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Notifications', // table name
        'joinLeagueRequestId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'Notifications', // table name
        'tradeRequestId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'Notifications', // table name
        'waiverOutBidId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'Notifications', // table name
        'waiverWonId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      ),
    ])
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
