'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLeague extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserLeague.init({
    leagueId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER,
    leagueName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserLeague',
  });

  UserLeague.getLeagueHome = async(leagueId) => {
    try {
      let leagueData = await sequelize.query(`
      SELECT "UserLeagues"."teamId" as "ulteamId", * FROM "UserLeagues"
        JOIN "Players" ON "UserLeagues"."teamId" = "Players"."id"
        JOIN "Leagues" ON "UserLeagues"."leagueId" = "Leagues"."id"
        WHERE "UserLeagues"."leagueId" = ${leagueId}`);
      return leagueData[0];
    } catch(error){
      return error;
    }
  }
  
  return UserLeague;
};