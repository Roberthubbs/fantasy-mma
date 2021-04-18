'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JoinLeagueRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  JoinLeagueRequest.init({
    requesterId: DataTypes.INTEGER,
    leagueOwnerId: DataTypes.INTEGER,
    leagueNameString: DataTypes.STRING,
    requestMessage: DataTypes.STRING,
    waitingApproval: DataTypes.BOOLEAN,
    approved: DataTypes.BOOLEAN,
    denied: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'JoinLeagueRequest',
  });
  return JoinLeagueRequest;
};