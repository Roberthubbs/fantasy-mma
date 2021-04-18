const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');
const { Fighter, LeagueFighter, Player, sequelize, LeagueAuction } = require('../models');

router.post('/all', async(req, res) => {
    // fs.createReadStream('/Users/roberthubert/Desktop/mma-fantasy/csv-doc.csv')
    //     .pipe(csv())
    //     .on('data', async(row) => {
    //         let wins = ''
    //         let losses = '';
    //         let seenDash = false
    //         for (let i = 0; i < row.RECORD.length; i++){
    //             if (isNaN(parseInt(row.RECORD[i]))){
    //                 if (seenDash){
    //                     break;
    //                 }
    //                 seenDash = true;
    //             }
    //             if (!seenDash && !isNaN(parseInt(row.RECORD[i]))){
    //                 wins += row.RECORD[i];
    //             } else if (seenDash && !isNaN(parseInt(row.RECORD[i]))){
    //                 losses += row.RECORD[i];
    //             }
    //         }
    //         let nameArr = row.NAME.split(' ');
    //         let first = nameArr[0];
    //         let last = nameArr[1];
    //         let ranking;
    //         if (parseInt(row.RANK)){
    //             ranking = parseInt(row.RANK)
    //         } else {
    //             ranking = null
    //         }
    //         let fighterObject = {
    //             firstName: first,
    //             lastName: last,
    //             wins: parseInt(wins),
    //             losses: parseInt(losses),
    //             ranking: ranking,
    //             nextOpponent: row.OPPONENT,
    //             lastWeight: row.WEIGHTCLASS
    //         }
    //         console.log(fighterObject);

    //         console.log({'wins': parseInt(wins), 'losses': parseInt(losses)});
    //        //console.log(recordArr[1])
    //        try {
    //            let fighter = await Fighter.create(fighterObject)
    //             console.log(fighter)
    //        } catch(error){
    //            console.log(error)
    //        }
    //     })
    //     .on('end', () => {
    //         console.log('CSV file successfully processed');
    //     })
    //     .catch((err) => console.log(err));
    debugger;
    let arr = Object.keys(req.body);
    let selectedWeightClass = arr[0];
    console.log(selectedWeightClass);
    let fighters
    try {
        if (selectedWeightClass === 'All'){
            fighters = await Fighter.findAll({ raw: true });
        } else {
            fighters = await Fighter.findAll({where: {lastWeight: selectedWeightClass}}, {raw: true});
        }
        res.send(fighters)
    } catch (error){
        res.send('Error finding all fighters ', error)
    }

});

router.post('/free-agents/:leagueId', async(req, res) => {
    let currLeague = req.params.leagueId;
    let weightClass = req.body.weightClass;
    console.log(weightClass);
    console.log(req.body);
    let fighters;
    try {
        if (weightClass == 'All'){
             fighters = await LeagueFighter.findFreeAgents(currLeague);//sequelize.query(`SELECT * FROM "Fighters" where "id" not in (Select fighterId from "LeagueFighter" a where a."leagueId" = ${currLeague})`, {raw: true});

        } else {
            fighters = await LeagueFighter.findFreeAgentsByWeight(currLeague, weightClass);
        }
        res.send(fighters);
    } catch (error) {
        res.send('Error finding free agents ', error)
    }

});

router.post('/all/weight-class/:weight', async(req, res) => {
    let  { weight } = req.headers;
    try {
        let fighters = await Fighter.findAll({ where: { lastWeight: weight } });
        res.send(fighters);
    } catch(error) {
        res.send('Error: Chael never lost a round', error);
    }

});


router.post('/add-fighter/:fighterId/:teamId/:leagueId', async(req, res) => {
    let { fighterId, teamId, leagueId } = req.params;
    console.log(fighterId, teamId, leagueId);
    let { cost } = req.body;
    try {
        let fighter = await LeagueFighter.findOne({where: {fighterId: fighterId, leagueId: leagueId}});
        console.log(fighter)
        console.log(await Player.calculateWaiver(teamId, cost));
        // if (fighter ){
        //     res.send(body);
        //     return;
        // }
        // leagueId: DataTypes.INTEGER,
        //     teamId: DataTypes.INTEGER,
        //         bidTime: DataTypes.DATE,
        //             auctionStartDate: DataTypes.DATE,
        //                 auctionEndDate: DataTypes.DATE,
        //                     fighterId: DataTypes.INTEGER,
        //                         bidCost:
        await LeagueAuction.create({leagueId: leagueId, fighterId: fighterId, bidCost: cost, bidTime: Date.now(), teamId: teamId});
  //      await LeagueFighter.create({fighterId: fighterId, teamId: teamId, leagueId: leagueId});
  //      let fighters = await LeagueFighter.findAll({where: {leagueId: leagueId, teamId: teamId}});
        let auction = await LeagueAuction.findAll({where: {leagueId: leagueId}});
        debugger;
        res.status(200).json(auction);
    } catch(error){
        res.send('Error adding fighter', error);
    }

});

module.exports = router;