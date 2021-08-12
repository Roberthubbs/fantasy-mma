'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class leagueDraft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  leagueDraft.init({
    leagueId: DataTypes.INTEGER,
    timeremaining: DataTypes.INTEGER,
    pickNo: DataTypes.INTEGER,
    complete: DataTypes.BOOLEAN,
    teamId: DataTypes.INTEGER,
    fighterId: DataTypes.INTEGER,
    fighterName: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'leagueDraft',
  });
  return leagueDraft;
};