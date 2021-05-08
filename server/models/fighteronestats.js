'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FighterOneStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FighterOneStats.init({
    fighterId: DataTypes.INTEGER,
    fightHappenedOn: DataTypes.DATE,
    takedownAttempted: DataTypes.INTEGER,
    takedownCompleted: DataTypes.INTEGER,
    takedownAttemptAgainst: DataTypes.INTEGER,
    takedownAttemptDefended: DataTypes.INTEGER,
    strikesAttempted: DataTypes.INTEGER,
    strikesLanded: DataTypes.INTEGER,
    significantLanded: DataTypes.INTEGER,
    significantTaken: DataTypes.INTEGER,
    totalStrikesTaken: DataTypes.INTEGER,
    finshed: DataTypes.BOOLEAN,
    won: DataTypes.BOOLEAN,
    wonByKO: DataTypes.BOOLEAN,
    wonBySUB: DataTypes.BOOLEAN,
    lostBySub: DataTypes.BOOLEAN,
    lostByKO: DataTypes.BOOLEAN,
    lost: DataTypes.BOOLEAN,
    opponentRank: DataTypes.BOOLEAN,
    bonusWin: DataTypes.BOOLEAN,
    champWin: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'FighterOneStats',
  });
  return FighterOneStats;
};