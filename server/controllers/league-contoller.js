const express = require('express');
const router = express.Router();
const { League, LeagueAuction, UserLeague, JoinLeagueRequest, Notification, currentLeague } = require("../models");
const { Op } = require("sequelize");


router.post('/create-league', async(req, res) => {
    let { leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal } = req.body;
    console.log(req.body);
    if (leagueName  && maxPlayerCount && leagueStartDate && leagueEndDate && teamId){
        try {
            let leagueCreate = await League.create({ leagueIdString: leagueName, teamId: teamId, playerTotal: maxPlayerCount, leagueStartDate: leagueStartDate, leagueEndDate: leagueEndDate, eventTotal: eventTotal  });
            let userLeague = await UserLeague.create({leagueId: leagueCreate.id, teamId: teamId, adminId: teamId, leagueName: leagueName});
            let league = await League.findOne({where: {teamId: teamId, leagueIdString: leagueName}}, {raw: true});
            res.status(200).json(leagueCreate);
        } catch (error) {
            res.status(300).json({'error': error});
        }
    } else {
        res.send('More Information Required');
    }
});

router.post('/league-auction/:leagueId', async(req,res) => {
    let { leagueId } = req.params;
    try{
        let currAuction = await LeagueAuction.getCurrentAuction(leagueId)//findAll({ where: { leagueId: leagueId } });
        res.status(200).json(currAuction);
    } catch (error){
        res.status(400).json({error: error})
    }
});


router.get(`/league-auction/:userId&leagueName=:leagueName`, async(req, res) => {
    let { userId, leagueName} = req.params;
    try {
        let league = await UserLeague.findOne({ where: { leagueName: leagueName, teamId: userId}});
        res.status(200).json(league);
    } catch (error){
        res.status(400).json({error: error});
    }
});

router.get(`/all-leagues/:leagueName`, async(req, res) => {
    let {leagueName} = req.params;
    let lowered = leagueName.toLowerCase();
    try {
        let leagues = await League.getAllLeagues(lowered)
        res.status(200).json(leagues)
    } catch (error){
        res.status(400).json({error: error})
    }
})

router.post(`/join-league`, async(req,res) => {
    let {userId, leagueName, leagueId, adminId, requestMessage} = req.body;
    // senderId: DataTypes.INTEGER,
    //     receiverId: DataTypes.INTEGER,
    //         seen: DataTypes.BOOLEAN,
    //             responded: DataTypes.BOOLEAN
    try {
        let league = await JoinLeagueRequest.create({ requesterId: userId, leagueOwnerId: adminId, leagueNameString: leagueName, waitingApproval: true, requestMessage: requestMessage});
        let notification = await Notification.create({ type: 1, typeString: 'LeagueJoinRequest', senderId: userId, receiverId: adminId, seen: false, responded: false, joinLeagueRequestId: league.dataValues.id, requestId: league.dataValues.id });
    } catch(error) {
        res.status(400).send(error)
    }
})
router.post(`/add-current-league`, async(req,res) => {
    let {teamId, leagueId} = req.body;
    let storedLeague = await currentLeague.findOne({where: {teamId: teamId}});
    if (storedLeague){
        try {
            
            let updateLeague = await currentLeague.update({leagueId: leagueId}, {where:{teamId: teamId}})
            res.status(200).json(updateLeague)
        } catch(error) {
            res.status(400).json(error)
        }
    } else {
        try {

            let updateLeague = await currentLeague.create({leagueId: leagueId, teamId: teamId})
            res.status(200).json(updateLeague)
        } catch (error) {
            res.status(400).json(error)
        }
    }
})

router.get(`/get-current-league/:teamId`, async(req, res) => {
    let { teamId } = req.params;

    let storedLeague = await currentLeague.findOne({ where: { teamId: teamId } });
    if (storedLeague){
        try {
            res.status(200).json(storedLeague);
        } catch(error) {
            res.status(400).json(error);
        }
    }
});

router.get(`/league-home-players/:leagueId`, async(req, res) => {
    let { leagueId } = req.params;
    console.log(leagueId);
    try {
        let leagueData = await UserLeague.getLeagueHome(leagueId);
        console.log("leagueData Found: ", leagueData);
        res.status(200).json(leagueData);
    } catch(error) {
        res.status(200).json(error);
    }
})

router.get(`/user/leagues/:userId`, async(req, res) => {
    let { userId } = req.params;
    try {
        let leagues = await UserLeague.findAll({where: { teamId: userId}});

        res.status(200).json(leagues);
    } catch (error){
        res.status(400).json(error);
    }
})
module.exports = router;