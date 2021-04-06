const express = require('express');
const router = express.Router();
const { League } = require("../models");


router.post('/create-league', async(req, res) => {
    let { leagueName, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal } = req.body;
    if (leagueName  && maxPlayerCount && leagueStartDate && leagueEndDate){
        try {
            let league = await League.create({ leagueIdString: leagueName, playerTotal: maxPlayerCount, leagueStartDate: leagueStartDate, leagueEndDate: leagueEndDate, eventTotal: eventTotal  });
            res.send(league.json());
        } catch (error) {
            res.send('Error creating League', error);
        }
    } else {
        res.send('More Information Required');
    }
});


module.exports = router;