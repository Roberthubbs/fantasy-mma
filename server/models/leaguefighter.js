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
     // let fighters = await sequelize.query(`SELECT * FROM "Fighters" zz where zz."id" not in (Select "fighterId" from "LeagueFighters" a where a."leagueId" = ${leagueId})`);
      let fighters = await sequelize.query(`SELECT zz."id", zz."firstName", zz."lastName", zz."lastWeight", zz."wins", zz."losses", zz."ranking", zz."nextOpponent", zz."fullName", (SELECT max("bidCost") from "LeagueAuctions" where "fighterId" = zz."id" and "LeagueAuctions"."leagueId" = ${leagueId}) as current_bid
        FROM
        "Fighters" zz 
        where zz."id" not in (Select "fighterId" from "LeagueFighters" a where a."leagueId" = ${leagueId})`)
     return fighters[0];
    } catch(error){
      return error;
    }
    
    
  }
  LeagueFighter.findFreeAgentsByWeight = async function(leagueId, weightClass){
    try {
      let fighters = await sequelize.query(`SELECT * FROM "Fighters" zz where zz."id" not in (Select "fighterId" from "LeagueFighters" a where a."leagueId" = ${leagueId}) and zz."lastWeight" = '${weightClass}'`);
      return fighters[0];
    } catch (error) {
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