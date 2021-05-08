'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fighter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Fighter.init({
    fightBooked: DataTypes.BOOLEAN,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    lastFight: DataTypes.DATE,
    nextFight: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
    socialUrl: DataTypes.STRING,
    lastWeight: DataTypes.STRING,
    secondWeight: DataTypes.STRING,
    thirdWeight: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    ranking: DataTypes.INTEGER,
    nextOpponent: DataTypes.STRING,
    fullName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fighter',
  });
  return Fighter;
};