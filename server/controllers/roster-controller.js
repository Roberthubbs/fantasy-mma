const express = require('express');
const router = express.Router();
const { LeagueFighter, Roster } = require("../models");
const { Op } = require("sequelize");

router.get('/current-roster/:leagueId&teamId=:playerId', async(req,res) => {
    console.log('Came to route')
    debugger;
    try{
        let {leagueId, playerId} = req.params;
        let roster = await Roster.findAll({where: {teamId: playerId, leagueId: leagueId}});
        debugger;
        return res.status(200).json(roster);
    } catch (err) {
        return res.status(400).json(error)
    }
})

module.exports = router;