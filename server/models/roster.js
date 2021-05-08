'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Roster.init({
    leagueId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    weightClass: DataTypes.STRING,
    fighterId: DataTypes.INTEGER,
    fighterName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roster',
  });
  return Roster;
};