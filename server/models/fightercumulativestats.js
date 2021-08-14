'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FighterCumulativeStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FighterCumulativeStats.init({
    fighterId: DataTypes.INTEGER,
    height: DataTypes.STRING,
    reach: DataTypes.STRING,
    stance: DataTypes.STRING,
    dob: DataTypes.DATE,
    slpm: DataTypes.STRING,
    slaccuracy: DataTypes.STRING,
    sapminute: DataTypes.STRING,
    strdef: DataTypes.STRING,
    strdef: DataTypes.STRING,
    tdavg: DataTypes.STRING,
    tdacc: DataTypes.STRING,
    tddef: DataTypes.STRING,
    subattperfifteen: DataTypes.STRING,
    nickname: DataTypes.STRING,
    record: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FighterCumulativeStats',
  });
  return FighterCumulativeStats;
};