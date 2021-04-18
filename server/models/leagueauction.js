'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeagueAuction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LeagueAuction.init({
    leagueId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    bidTime: DataTypes.DATE,
    auctionStartDate: DataTypes.DATE,
    auctionEndDate: DataTypes.DATE,
    fighterId: DataTypes.INTEGER,
    bidCost: DataTypes.INTEGER
  }, {
    
    sequelize,
    modelName: 'LeagueAuction',
  });
  LeagueAuction.getCurrentAuction = async(leagueId) => {
    try {
      let currentAuction = await sequelize.query(`SELECT "fighterId", "bidCost", "bidTime", "leagueId", a."teamId", "firstName", "lastName", "lastWeight", "nextOpponent", (SELECT c."username" from "Players" as c where c."id" = a."teamId") as "usernameOfBidder" 
    
      from "LeagueAuctions" as a
      INNER JOIN "Fighters" on (a."fighterId" = "Fighters"."id")
      where a."leagueId" = ${leagueId} AND "bidCost" is not null 
      and a."bidCost" = (SELECT max("bidCost") from "LeagueAuctions" where "fighterId" = a."fighterId")
      ORDER BY "lastName" desc, "bidCost" desc`, {raw: true});
      let children = await sequelize.query(`SELECT a."fighterId", array_agg((SELECT c."username" from "Players" as c where c."id" = a."teamId") || '$' || a."bidCost")
        FROM "LeagueAuctions" a
        where a."leagueId" = ${leagueId}
        and a."bidCost" <> (select max("bidCost") from "LeagueAuctions" where "fighterId" = a."fighterId")

        GROUP BY a."fighterId"`, {raw: true});
      console.log(children);
      currentAuction[0].map((fighter) => {
        
        children[0].forEach((child) => {

          if (fighter.fighterId == child.fighterId){
  //          console.log(fighter.fighterId)
            return fighter.children = child.array_agg;
          }
        })
      })

      return currentAuction[0];
    } catch (error) {
      return error;
    }
  }
  return LeagueAuction;
};