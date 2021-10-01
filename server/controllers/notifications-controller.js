const express = require('express');
const router = express.Router();
const { Notification, JoinLeagueRequest, UserLeague, League } = require('../models');
const db = require('../models');
router.get('/notifications/:userId', async(req, res) => {
    let { userId } = req.params;
    try {
        let userNotifications = await db.sequelize.query(`
        SELECT "Notifications"."id" as notificationId, "type", "senderId" as senderId, "username" as senderName, "requestMessage", "JoinLeagueRequests"."createdAt", "seen", "responded", "joinLeagueRequestId", "Leagues"."id" as leagueid
        FROM "Notifications"
        INNER JOIN "Players" on "Players"."id" = "Notifications"."senderId"
        INNER JOIN "JoinLeagueRequests" on "JoinLeagueRequests"."id" = "Notifications"."requestId"
		INNER JOIN "Leagues" ON "Leagues"."leagueIdString" = "JoinLeagueRequests"."leagueNameString"
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
    let { userId, response, requestId, leagueId } = req.body;
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
             where: {id: requestId}
        })
        if (approved == true){
            let league = await League.findOne({where: {id: leagueId}})
            let userLeague = await UserLeague.create({ leagueId: leagueId, teamId: userId, adminId: league.teamId, leagueName: league.leagueIdString });

        }
        res.status(200).json(userLeague)
        //let createUserLeague = 
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;