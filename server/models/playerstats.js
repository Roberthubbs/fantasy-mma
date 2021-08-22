'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerStats = sequelize.define('PlayerStats', {
    playerId: DataTypes.STRING,
    leagueId: DataTypes.STRING,
    takedownsDefended: DataTypes.INTEGER,
    takedownsAttemptedAgainst: DataTypes.INTEGER,
    takedownsnsCompleted: DataTypes.INTEGER,
    takedownsAttempted: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    finished: DataTypes.INTEGER,
    finishes: DataTypes.INTEGER,
    submissions: DataTypes.INTEGER,
    significantStrikes: DataTypes.INTEGER,
    strikesAttempted: DataTypes.INTEGER,
    strikesAbsorbed: DataTypes.INTEGER,
    ko: DataTypes.INTEGER,
    kod: DataTypes.INTEGER,
    strikeDifferential: DataTypes.INTEGER
  }, {});
  PlayerStats.associate = function(models) {
    // associations can be defined here
  };
  return PlayerStats;
};