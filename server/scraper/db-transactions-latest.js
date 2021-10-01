const { Fighter, Fight, Roster, PlayerStats, FighterOneStats, Points } = require('../models');

module.exports = {

    addFights:  async (fight, i) => {
        let errors = [];
        

        

            let record = fight[i]


            let weight = '';
            console.log("Record: ", record);
            if (record.fighterOne.weightClass.includes('WELTERWEIGHT')){
                weight = 'WW'
            } else if (record.fighterOne.weightClass.includes('HEAVYWEIGHT')){
                weight = 'HW'
            } else if (record.fighterOne.weightClass.includes('FEATHERWEIGHT')) {
                weight = 'FW'
            } else if (record.fighterOne.weightClass.includes('LIGHTWEIGHT')) {
                weight = 'LW'
            } else if (record.fighterOne.weightClass.includes('FLYWEIGHT') && !record.fighterOne.weightClass.includes('WOMEN')) {
                weight = 'FLW'
            } else if (record.fighterOne.weightClass.includes('BANTAMWEIGHT BOUT') && !record.fighterOne.weightClass.includes('WOMEN')) {
                weight = 'BW'
            } else if (record.fighterOne.weightClass.includes('FLYWEIGHT') && record.fighterOne.weightClass.includes('WOMEN')) {
                weight = 'WFLW'
            } else if (record.fighterOne.weightClass.includes('BANTAMWEIGHT BOUT') && record.fighterOne.weightClass.includes('WOMEN')) {
                weight = 'WBW'
            } else if (record.fighterOne.weightClass.includes('STRAWWEIGHT')) {
                weight = 'WSW'
            } else if (record.fighterOne.weightClass.includes('LIGHT HEAVYWEIGHT')) {
                weight = 'LHW'
            } else if (record.fighterOne.weightClass.includes('MIDDLEWEIGHT')) {
                weight = 'MW'
            } else if (record.fighterOne.weightClass.includes('FEATHERWEIGHT') && record.fighterOne.weightClass.includes('WOMEN')) {
                weight = 'WFW'
            }
            const today = new Date();
            let fighterOne = await Fighter.findOne({where: {link: record.fighterOne.fighterLink}})
            let fighterTwo = await Fighter.findOne({where: {link: record.fighterTwo.fighterLink}})
            if (!fighterOne){
                console.log(`${today.toLocaleString()}: Could not find record ${weight}, ${record.fighterOne.name} as fighterOne, index ${i}`);
            } else if (!fighterTwo){
                console.log(`${today.toLocaleString()}: Could not find record ${weight}, ${record.fighterTwo.name} as fighterTwo, index ${i}`);

            } else {
                let oneId = fighterOne.id;
                let twoId = fighterTwo.id;
                let date = record.fighterOne.fightDate//.split('').slice(6).join('');
                let fOO = {};
                let fTO = {};
                let fO = record.fighterOne;
                let fT = record.fighterTwo;

                let won = { fO: false, fT: false };
                let lost = { fO: false, fT: false };
                let finished = {fO: false, fT: false};
                let method = '';
                let bonus = {fO: false, fT: false};
                let champWin = {fO: false, fT: false};
                let koW = {fO: false, fT: false};
                let subW = { fO: false, fT: false };
                if (fO.result == 'W'){
                
                    won.fO = true;
                    won.fT = false;
                } else if (fT.result == 'W'){
                    won.fO = false;
                    won.fT = true;
                }
                if (won.fO){
                    if (fO.method.includes('KO') || fO.method.includes('SUB')){
                        
                        fO.method.includes('SUB') ? method = 'SUB' : method = 'KO';
                        method == 'KO' ? koW.fO = true : subW.fO = true;
                        finished.fO =  false;
                        finished.fT = true ;
                    }
                    if (fO.bonusWin){
                        bonus.fO = true;
                    }
                    if (fT.bonusWin){
                        bonus.fO = true;

                    }
                    if (fO.champWin){
                        champWin.fO = true
                    }
                } else if (won.fT){
                    if (fT.method.includes('KO') || fT.method.includes('SUB')) {
                        fT.method.includes('SUB') ? method = 'SUB' : method = 'KO';
                        method == 'KO' ? koW.fT = true : subW.fT = true;

                        finished.fO = true;
                        finished.fT = false;
                    }
                    if (fO.bonusWin) {
                        bonus.fO = true;
                    }
                    if (fT.bonusWin) {
                        bonus.fO = true;

                    }
                    if (fT.champWin) {
                        champWin.fT = true
                    }
                }
                let dateOne = fO.dob.split('').slice(4).join('').trim();
                let dateTwo = fT.dob.split('').slice(4).join('').trim();
                dateOne = new Date(dateOne);
                dateTwo = new Date(dateTwo)
                fOO = {
                    fighterId: oneId,
                    fightHappenedOn: date,
                    takedownAttempted: fO.tdAttempted,
                    takedownCompleted: fO.tdLaned,
                    takedownAttemptAgainst: fT.tdAttempted,
                    takedownAttemptDefended: fT.tdLanded,
                    strikesAttempted: fO.sigAttempted,
                    strikesLanded: fO.sigLanded,
                    significantLanded: fO.sigLanded,
                    significantTaken: fT.sigLanded,
                    totalLanded: fO.totalLaned,
                    totalAttempted: fO.totalAttempted,
                    finshed: finished.fO,
                    won: won.fO,
                    wonByKO: koW.fO,
                    wonBySUB: subW.fO,
                    lostBySub: subW.fT,
                    lostByKO: koW.fT,
                    lost: !won.FO,
                    champWin: champWin.fO,
                    bonusWin: bonus.fO,
                    date_of_birth: dateOne
                }
                fTO = {
                    fighterId: twoId,
                    fightHappenedOn: date,
                    takedownAttempted: fT.tdAttempted,
                    takedownCompleted: fT.tdLaned,
                    takedownAttemptAgainst: fO.tdAttempted,
                    takedownAttemptDefended: fO.tdLanded,
                    strikesAttempted: fT.sigAttempted,
                    strikesLanded: fT.sigLanded,
                    significantLanded: fT.sigLanded,
                    significantTaken: fO.sigLanded,
                    totalLanded: fO.totalLaned,
                    totalAttempted: fO.totalAttempted,
                    //totalStrikesTaken: DataTypes.INTEGER,
                    finshed: finished.fT,
                    won: won.fT,
                    wonByKO: koW.fT,
                    wonBySUB: subW.fT,
                    lostBySub: subW.fO,
                    lostByKO: koW.fO,
                    lost: !won.fT,
                    champWin: champWin.fT,
                    bonusWin: bonus.fT,
                    date_of_birth: dateTwo
                }
                let cfo = await FighterOneStats.create(fOO);
                let cft = await FighterOneStats.create(fTO);

                let fighterOnePlayers = await Roster.findAll({where: {fighterId: oneId} }, {raw: true})
                let fighterTwoPlayers = await Roster.findAll({where: {fighterId: twoId} }, {raw: true})

                fighterOnePlayers.forEach(async(player) => {
                    let addBonus = 0;
                    if (fOO["champWin"]){
                        addBonus += 1.5;
                    }
                    if (fOO["bonusWin"]){
                        addBonus += 1.5;
                    }
                    let addToKoWin = 0;
                    if (fOO["oneByKO"]){
                        fOO += 1;
                    }
                    let addToSubWin = 0;
                    if (fOO["oneBySub"]){
                        fOO += 1;
                    }
                    let addToKoLoss = 0;
                    if (fOO["lostByKO"]){
                        fOO += 1;
                    }
                    let addToSubLoss = 0;
                    if (fOO["lostBySub"]){
                        fOO += 1;
                    }
                    let wins = 0;
                    if (fOO["win"]){
                        wins += 1;
                    }
                    let losses = 0;
                    if (fOO["losses"]){
                        losses += 1;
                    }
                    let finished = 0;
                    if (addToSubLoss || addToKoLoss){
                        finished += 1;
                    }
                    let finishes = 0;
                    if (addToKoWin || addToSubWin){
                        finishes += 1;
                    }
                    let stats = {

                    takedownsAttempted: fOO["takedownAttempted"],
                    takedownsnsCompleted: fOO["takedownCompleted"],
                    takeDownsAttemptedAgainst: fOO["takedownAttemptAgainst"],
                    takedownsDefended: fOO["takedownsDefended"],
                    strikesAttempted: fOO["totalAttempted"],
                    strikesLanded: fOO["totalLanded"],
                    significantStrikes: fOO["significantLanded"],
                    significantStrikesAbsorbed: fTO["significantLanded"],
                    strikesAbsorbed: fOO["strikesAbsorbed"],
                    finishes,
                    finished,
                    wins,
                    ko: addToKoWin,
                    submissions: addToSubWin,
                    submitted: addToSubLoss,
                    kod: addToKoLoss,
                    losses,
                    addBonus,
                }
                    let playerRecords = await PlayerStats.findOne({where: {leagueId: player.leagueId, playerId: player.teamId}});
                    let points = await Points.findOne({where: {leagueId: player.leagueId, playerId: player.teamId}})
                    if (!playerRecords){
                        let playerId = player.teamId;
                        let leagueId = player.leagueId;
                        stats.playerId = playerId;
                        stats.leagueId = leagueId;
                        try {
                            await PlayerStats.create(stats) 
                        } catch (error){
                            console.log(error)
                        }
                        
                    } else {
                        stats.takedownsAttempted += playerRecords.takedownsAttempted
                        stats.takedownsnsCompleted += playerRecords.takedownsnsCompleted
                        stats.takeDownsAttemptedAgainst += playerRecords.takeDownsAttemptedAgainst
                        stats.takedownsDefended += playerRecords.takedownsDefended
                        stats.strikesAttempted += playerRecords.strikesAttempted
                        stats.strikesLanded += playerRecords.strikesLanded
                        stats.significantStrikes += playerRecords.significantStrikes
                        stats.significantStrikesAbsorbed += playerRecords.significantStrikesAbsorbed
                        stats.finished += playerRecords.finished
                        stats.wins += playerRecords.wins
                        stats.ko += playerRecords.ko
                        stats.submissions += playerRecords.submissions
                        stats.submitted += playerRecords.submitted
                        stats.kod += playerRecords.kod
                        stats.losses += playerRecords.losses
                        stats.addBonus += playerRecords.addBonus
                        await PlayerStats.update(stats, {where: {
                            id: playerRecords.id
                        }});
                        let addPoints = 0;
                        addPoints += (Math.floor(stats.takedownsnsCompleted * 5));
                        addPoints += (Math.floor(stats.takedownsDefended * 5));
                        addPoints += (stats.strikesLanded);
                        if (stats.wins){
                            addPoints += 20;
                        }
                        if (points){
                            Points.update({total: points.total += addPoints}, {
                                where: {
                                    leagueId: player.leagueId, playerId: player.teamId
                                }
                            })
                        } else {
                            Points.create({total: addPoints, leagueId: player.leagueId, playerId: player.teamId})
                        }

                    }

                })
               
                fighterTwoPlayers.forEach(async(player) => {
                    console.log('player in roster loop', player)
                    console.log('playerId', player.id)
                    let addBonus = 0;
                    if (fTO["champWin"]){
                        addBonus += 1.5;
                    }
                    if (fTO["bonusWin"]){
                        addBonus += 1.5;
                    }
                    let addToKoWin = 0;
                    if (fTO["oneByKO"]){
                        addToKoWin += 1;
                    }
                    let addToSubWin = 0;
                    if (fTO["oneBySub"]){
                        addToSubWin += 1;
                    }
                    let addToKoLoss = 0;
                    if (fTO["lostByKO"]){
                        addToKoLoss += 1;
                    }
                    let addToSubLoss = 0;
                    if (fTO["lostBySub"]){
                        addToSubLoss += 1;
                    }
                    let wins = 0;
                    if (fTO["win"]){
                        wins += 1;
                    }
                    let losses = 0;
                    if (fTO["losses"]){
                        losses += 1;
                    }
                    let finished = 0;
                    if (addToSubLoss || addToKoLoss){
                        finished += 1;
                    }
                    let finishes = 0;
                    if (addToKoWin || addToSubWin){
                        finishes += 1;
                    }
                    let stats = {

                    takedownsAttempted: fTO["takedownAttempted"],
                    takedownsnsCompleted: fTO["takedownCompleted"],
                    takeDownsAttemptedAgainst: fTO["takedownAttemptAgainst"],
                    takedownsDefended: fTO["takedownAttemptDefended"],
                    strikesAttempted: fTO["strikesAttempted"],
                    strikesLanded: fTO["strikesLanded"],
                    significantStrikes: fTO["significantLanded"],
                    significantStrikesAbsorbed: fTO["significantTaken"],
                    strikesAbsorbed: fOO["strikesAbsorbed"],
                    finishes,
                    finished,
                    wins,
                    ko: addToKoWin,
                    submissions: addToSubWin,
                    submitted: addToSubLoss,
                    kod: addToKoLoss,
                    losses,
                    addBonus,
                }
                   // console.log("fTO", fTO)
                    console.log(stats);
                    let playerRecords = await PlayerStats.findOne({where: {leagueId: player.leagueId.toString(), playerId: player.teamId.toString()}});
                    console.log('playerRecords: ', playerRecords)
                    if (!playerRecords){
                        let playerId = player.teamId;
                        let leagueId = player.leagueId;
                        stats.playerId = playerId;
                        stats.leagueId = leagueId;
                        console.log("MADE IT INTO THE STATS: ", stats)
                        try {
                            await PlayerStats.create(stats) 
                        } catch (error){
                            console.log(error)
                        }
                    } else {
                        console.log("MADE IT INTO THE STATS ELSE BLOCK: ", stats)

                        stats.takedownsAttempted += playerRecords.takedownsAttempted
                        stats.takedownsnsCompleted += playerRecords.takedownsnsCompleted
                        stats.takeDownsAttemptedAgainst += playerRecords.takeDownsAttemptedAgainst
                        stats.takedownsDefended += playerRecords.takedownsDefended
                        stats.strikesAttempted += playerRecords.strikesAttempted
                        stats.strikesLanded += playerRecords.strikesLanded
                        stats.significantStrikes += playerRecords.significantStrikes
                        stats.significantStrikesAbsorbed += playerRecords.significantStrikesAbsorbed
                        //totalStrikesTaken: DataTypes.INTEGER += playerRecords.
                        stats.finished += playerRecords.finished
                        stats.wins += playerRecords.wins
                        stats.ko += playerRecords.ko
                        stats.submissions += playerRecords.submissions
                        stats.submitted += playerRecords.submitted
                        stats.kod += playerRecords.kod
                        stats.losses += playerRecords.losses
                        stats.addBonus += playerRecords.addBonus
                        await PlayerStats.update(stats, {where: {
                            id: playerRecords.id
                        }});
                        let addPoints = 0;
                        addPoints += (Math.floor(stats.takedownsnsCompleted * 5));
                        addPoints += (Math.floor(stats.takedownsDefended * 5));
                        addPoints += (stats.strikesLanded);
                        if (stats.wins){
                            addPoints += 20;
                        }
                        if (points){
                            Points.update({total: points.total += addPoints}, {
                                where: {
                                    leagueId: player.leagueId, playerId: player.teamId
                                }
                            })
                        } else {
                            Points.create({total: addPoints, leagueId: player.leagueId, playerId: player.teamId})
                        }
                    }
                })
                if (cfo.id && cft.id){
                    let fight = await Fight.create({weightClass: weight, fighterOne: cfo.id, fighterTwo: cft.id})
                } else {
                    console.log(`NOT ABLE TO CREATE FIGHT FOR ${record.fighterOne.name} and ${record.fighterTwo.name}`)
                }
                
            }
        
    }
    
    
}