'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'PlayerStats', // table name
        'bonusPoints', // new field name
        {
          type: Sequelize.DECIMAL(10,2),
          allowNull: true,
        }
      )], 
      [
      queryInterface.addColumn(
        'PlayerStats', // table name
        'submitted', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      )],
            [
      queryInterface.addColumn(
        'PlayerStats', // table name
        'significantStrikesAbsorbed', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      )]
      )
  }, 

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
