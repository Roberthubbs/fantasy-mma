'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Fight.init({
    fighterOne: DataTypes.INTEGER,
    fighterTwo: DataTypes.INTEGER,
    weightClass: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fight',
  });

  Fight.getRecentEvent = async() => {
    try {
      let recentFights = await sequelize.query(
        `SELECT a."id" as fighterOneStatsId, a."fighterId" as fighterOneId, a."fightHappenedOn" as fightDate, a."takedownAttempted" as fighterOneTakedownAttempted, a."takedownCompleted" as fighterOneTakedownCompleted, a."takedownAttemptAgainst" as fighterOneTakedownAttemptAgainst, a."takedownAttemptDefended" as fighterOneTakedownAttemptDefended, a."strikesAttempted" as fighterOneStrikesAttempted, a."strikesLanded" as fighterOneStrikesLanded, b."id" as fightId,
          d."id" as fighterTwoStatsId, d."fighterId" as fighterTwoId, d."takedownAttempted" as fighterTwoTakedownAttempted, d."takedownCompleted" as fighterTwoTakedownCompleted, d."takedownAttemptAgainst" as fighterTwoTakedownAttemptAgainst, d."takedownAttemptDefended" as fighterTwoTakedownAttemptDefended, d."strikesAttempted" as fighterTwoStrikesAttempted, d."strikesLanded" as fighterTwoStrikesLanded, (SELECT "fullName" from "Fighters" where "id" = a."fighterId") as fighterOneFullName, (SELECT "fullName" from "Fighters" where "id" = d."fighterId") as fighterTwoFullName  
          FROM "FighterOneStats" a 
          JOIN "Fights" b ON b."fighterOne" = a."id"
          JOIN "FighterOneStats" d ON "d"."id" = b."fighterTwo"
          WHERE a."id" in (SELECT "fighterOne" FROM "Fights")`); 
      console.log('recent fights: ', recentFights[0])
      return recentFights[0];
    } catch (error) {
      return error;
    }
  }
  return Fight;
};