const express = require('express');
const router = express.Router();
const { LeagueFighter, Roster } = require("../models");
const { Op } = require("sequelize");

router.get('/current-roster/:leagueId&teamId=:playerId', async(req,res) => {
    let {leagueId, playerId} = req.params;
    try{
        let roster = await Roster.findAll({where: {teamId: playerId, leagueId: leagueId}});
        return res.status(200).json(roster);
    } catch (err) {
        return res.status(400).json(error)
    }
})

module.exports = router;