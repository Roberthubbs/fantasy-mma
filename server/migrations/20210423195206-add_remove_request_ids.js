'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Notifications', // table name
        'joinLeagueRequestId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      ),
      queryInterface.changeColumn(
        'Notifications', // table name
        'tradeRequestId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      ),
      queryInterface.changeColumn(
        'Notifications', // table name
        'waiverOutBidId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      ),
      queryInterface.changeColumn(
        'Notifications', // table name
        'waiverWonId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      ),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
