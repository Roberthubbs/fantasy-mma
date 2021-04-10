'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeagueFighter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LeagueFighter.findFreeAgents = async function(leagueId){
    try {
      let fighters = await sequelize.query(`SELECT * FROM "Fighters" zz where zz."id" not in (Select "fighterId" from "LeagueFighters" a where a."leagueId" = ${leagueId})`);
      return fighters[0];
    } catch(error){
      return error;
    }
    
    
  }


  LeagueFighter.init({
    leagueId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    fighterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LeagueFighter',
  });
  return LeagueFighter;
};