const { Fighter, LeagueFighter, Player, sequelize, LeagueAuction, Roster, League } = require('../models');
const fs = require("fs");
var util = require('util');

const chalk = require("chalk");

const success = chalk.keyword("green");
const today = new Date();

let logFile = fs.createWriteStream('/Users/roberthubert/Desktop/mma-fantasy/server/logs/roster-transition-error.log');
let successFile = fs.createWriteStream('/Users/roberthubert/Desktop/mma-fantasy/server/logs/roster-trainsition-success.log');
var log_stdout = process.stdout;
console.log = function (d,s) { //
    if (s == 'err'){
        logFile.write(util.format(d) + '\n');
        log_stdout.write(util.format(d) + '\n');
    } else {
        successFile.write(util.format(d)+ '\n');
        log_stdout.write(util.format(d) + '\n');
    }
    
};

const transitionToRoster = async()  => {
  //  let currAuction = await LeagueAuction.getCurrentAuction(leagueId);
    let leagues = await League.findAll({raw: true});
    //console.log(leagues))
    leagues = await JSON.stringify(leagues);
    JSON.parse(leagues).map(async(league) => {
        
        let leagueId = await league.id
       // console.log(leagueId);
        let currAuction = await LeagueAuction.getCurrentAuction(leagueId, 'roster');
       currAuction = JSON.parse(currAuction);
        debugger;
       // console.log(currAuction[1], 'err');
        currAuction.map(async (bid) => {
            try {
                let addToRoster = await Roster.create({ fighterId: bid.fighterId, fighterName: (bid.firstName + ' ' + bid.lastName), teamId: bid.teamId, leagueId: leagueId, weightClass: bid.lastWeight });
                let leagueFighter = await LeagueFighter.create({ leagueId: leagueId, fighterId: bid.fighterId, teamId: bid.teamId });
                let waiverLeft = await Player.findOne({where: {id: bid.teamId}});
                waiverLeft = waiverLeft.waiverLeft;
                let amount = waiverLeft - bid.bidCost;
                let updatePlayer = await Player.update(
                    { waiverLeft: waiverLeft - bid.bidCost },
                    { where: { id: bid.teamId } }
                );
                let deleteFromAuction = await LeagueAuction.destroy({ where: { id: bid.bidId } })
                if (bid.replacementFighterId){
                    let deleteRFLF = await LeagueFighter.destroy({ where: { teamId: teamId, fighterId: bid.replacementFighterId, leagueId: leagueId } });
                    let deleteRFR = await Roster.destroy({ where: { teamId: teamId, fighterId: bid.replacementFighterId, leagueId: leagueId } });

                }
                console.log(`${today.toLocaleString()}: SUCCESS: ${leagueId}, player: ${bid.teamId}, fighter: ${bid.fighterId}`, 'suc')
            } catch (error) {
                console.log(`${today.toLocaleString()}: Could not complete roster transfer for league: ${leagueId}, player: ${bid.teamId}, fighter: ${bid.fighterId} due to: ${error}`, 'err');

            }


            // console.log(bid)
        });
    })

}

transitionToRoster(1);