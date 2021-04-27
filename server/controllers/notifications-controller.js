const express = require('express');
const router = express.Router();
const { Notification } = require('../models');
const db = require('../models');
router.get('/notifications/:userId', async(req, res) => {
    let { userId } = req.params;
    debugger;
    try {
        let userNotifications = await db.sequelize.query(`
        SELECT "Notifications"."id" as notificationId, "type", "senderId" as senderId, "username" as senderName, "requestMessage", "JoinLeagueRequests"."createdAt", "seen", "responded", "joinLeagueRequestId"
        FROM "Notifications"
        INNER JOIN "Players" on "Players"."id" = "Notifications"."senderId"
        INNER JOIN "JoinLeagueRequests" on "JoinLeagueRequests"."id" = "Notifications"."requestId"
        where "Notifications"."receiverId" = :userId
        `, {
            replacements: { userId: userId },
            type: db.sequelize.QueryTypes.SELECT
        });//Notification.getUserNotifs(userId)
        res.status(200).json(userNotifications);
    } catch (error) {
        res.json(error)
    }
});

router.post('/respond-league-join', async(req,res) => {
    let { userId, response, requestId } = req.body;
    let approved;
    let declined;
    if (response === 1){
        approved = true;
        declined = false;
    } else {
        approved = false;
        declined = true;
    }
    try {
        let updateNotification = await Notification.update(
            { responded: true },
            { where: {joinLeagueRequestId: requestId} });
        let updateLeagueRequest = await JoinLeagueRequest.update({
            approved: approved, denied: declined, waitingApproval: false
        }, 
        {
             where: {id: joinLeagueRequestId}
        })
        //let createUserLeague = 
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;