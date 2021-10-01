'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Notification.init({
    type: DataTypes.INTEGER,
    typeString: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    seen: DataTypes.BOOLEAN,
    responded: DataTypes.BOOLEAN,
    requestId: DataTypes.INTEGER,
    joinLeagueRequestId: DataTypes.INTEGER,
    tradeRequestId: DataTypes.INTEGER,
    waiverOutBidId: DataTypes.INTEGER,
    waiverWonId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Notification',
  });

  Notification.getUserNotifs = async(userId) => {
    let notifications = await sequelize.query(`
      SELECT "Notifications"."id" as notificationId, "type", "senderId" as senderId, "username" as senderName, "requestMessage", "JoinLeagueRequests"."createdAt"
        FROM "Notifications"
        INNER JOIN "Players" on "Players"."id" = "Notifications"."senderId"
        INNER JOIN "JoinLeagueRequests" on "JoinLeagueRequests"."id" = "Notifications"."requestId"
        where "Notifications"."receiverId" = ${userId}
    `, {raw: true});
    return notifications[0];
  }
  return Notification;
};