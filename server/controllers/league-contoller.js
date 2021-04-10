const express = require('express');
const router = express.Router();
const { League } = require("../models");


router.post('/create-league', async(req, res) => {
    let { leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal } = req.body;
    console.log(req.body);
    //debugger;
    if (leagueName  && maxPlayerCount && leagueStartDate && leagueEndDate && teamId){
        try {
            let leagueCreate = await League.create({ leagueIdString: leagueName, teamId: teamId, playerTotal: maxPlayerCount, leagueStartDate: leagueStartDate, leagueEndDate: leagueEndDate, eventTotal: eventTotal  });
            let league = await League.findOne({where: {teamId: teamId, leagueIdString: leagueName}}, {raw: true});
            res.status(200).json(leagueCreate);
        } catch (error) {
            res.status(300).json({'error': error});
        }
    } else {
        res.send('More Information Required');
    }
});


module.exports = router;