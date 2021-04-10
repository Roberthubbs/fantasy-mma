'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class League extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  League.init({
    leagueIdString: DataTypes.STRING,
    leagueStartDate: DataTypes.DATE,
    leagueEndDate: DataTypes.DATE,
    eventTotal: DataTypes.INTEGER,
    playerTotal: DataTypes.STRING,
    teamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'League',
  });
  return League;
};