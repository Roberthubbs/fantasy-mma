const { Fighter, Fight, Roster, PlayerStats } = require('../models');

export const addFights = (fight) => {
    let errors = [];
    

    
        // console.log(allFights[i][0].fighterOne);
        // console.log(allFights[i][0].fighterTwo);
        let record = fight
        let fighterOneId = Fighter.findOne({where: {link: record.fighterOne.fighterLink}})
        let fighterTwoId = Fighter.findOne({where: {link: record.fighterTwo.fighterLink}})

        //console.log(allFights[i][0].fighterOne.weightClass);
        let weight = '';
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
            let date = record.fighterOne.fightDate.split('').slice(6).join('');
            let fOO = {};
            let fTO = {};
            let fO = record.fighterOne;
            let fT = record.fighterTwo;
            // fighterOne: {
            //     fightDate: 'DATE: April 24, 2021',
            //         name: 'Valentina Shevchenko',
            //             result: 'W',
            //                 method: 'KO/TKO ',
            //                     weightClass: " UFC WOMEN'S FLYWEIGHT TITLE BOUT",
            //                         champWin: true,
            //                             bonusWin: false,
            //                                 knockDowns: '0',
            //                                     sigLanded: '32',
            //                                         sigAttempted: '39',
            //                                             tdLanded: '7',
            //                                                 tdAttempted: '7',
            //                                                     subAttempts: '1',
            //                                                         ctrlTime: '5:11'}
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
                                                    //totalStrikesTaken: DataTypes.INTEGER,
                                                        finshed: finished.fO,
                                                            won: won.fO,
                                                                wonByKO: koW.fO,
                                                                    wonBySUB: subW.fO,
                                                                        lostBySub: subW.fT,
                                                                            lostByKO: koW.fT,
                                                                                lost: !won.FO,
                champWin: champWin.fO,
                bonusWin: bonus.fO,
                date_of_birth: fO.dob
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
                date_of_birth: fT.dob
            }
            let cfo = await FighterOneStats.create(fOO);
            let cft = await FighterOneStats.create(fTO);
            let fighterOnePlayers = await Roster.findAll({where: {fighterId: fighterOne.id} })
            let fighterTwoPlayers = await Roster.findAll({where: {fighterId: fighterTwo.id} })
            fighterOnePlayers.forEach((player) => {
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
                strikesAttempted: fOO["strikesAttempted"],
                strikesLanded: fOO["strikesLanded"],
                significantStrikes: fOO["significantLanded"],
                significantStrikesAbsorbed: fTO["significantLanded"],
                strikesAbsorbed: fOO["strikesAbsorbed"],
                //totalStrikesTaken: DataTypes.INTEGER,
                finishes,
                finshed,
                wins,
                ko: addToKoWin,
                submissions: addToSubWin,
                submitted: addToSubLoss,
                kod: addToKoLoss,
                losses,
                addBonus,
            }
                let playerRecords = await PlayerStats.findOne({where: {leagueId: player.leagueId, playerId: player.teamId}});
                if (!playerRecords){
                    let playerId = player.teamId;
                    let leagueId = player.leagueId;
                    stats.playerId = playerId;
                    stats.leagueId = leagueId;
                    await PlayerStats.createOne(stats)
                } else {
                    stats.takedownAttempted += playerRecords.takedownAttempted
                    stats.takedownCompleted += playerRecords.takedownCompleted
                    stats.takedownAttemptAgainst += playerRecords.takedownAttemptAgainst
                    stats.takedownAttemptDefended += playerRecords.takedownAttemptDefended
                    stats.strikesAttempted += playerRecords.strikesAttempted
                    stats.strikesLanded += playerRecords.strikesLanded
                    stats.significantLanded += playerRecords.significantLanded
                    stats.significantTaken += playerRecords.significantTaken
                    //totalStrikesTaken: DataTypes.INTEGER += playerRecords.
                    stats.finshed += playerRecords.finished
                    stats.wins += playerRecords.wins
                    stats.addToKoWin += playerRecords.addToKoWin
                    stats.addToSubWin += playerRecords.addToSubWin
                    stats.addToSubLoss += playerRecords.addToSubLoss
                    stats.addToKoLoss += playerRecords.addToKoLoss
                    stats.losses += playerRecords.losses
                    stats.addBonus += playerRecords.addBonus
                    await PlayerStats.update(stats, {where: {
                        id: playerRecords.id
                    }});
                }
                // await PlayerStats.createOne({

                // })
            })
            if (cfo.id && cft.id){
                let fight = await Fight.create({weightClass: weight, fighterOne: cfo.id, fighterTwo: cft.id})
            } else {
                console.log(`NOT ABLE TO CREATE FIGHT FOR ${record.fighterOne.name} and ${record.fighterTwo.name}`)
            }
            
        }
       
    }
    
    
