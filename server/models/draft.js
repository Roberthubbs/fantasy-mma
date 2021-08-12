'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class draft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  draft.init({
    leagueId: DataTypes.INTEGER,
    rounds: DataTypes.INTEGER,
    pickNo: DataTypes.INTEGER,
    complete: DataTypes.BOOLEAN,
    currentPicker: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'draft',
  });
  return draft;
};