const fighters = require('/Users/roberthubert/Desktop/mma-fantasy/fighters-collected-stats.json');
const { Fighter, FighterCumulativeStats } = require('../models');


const addFighters = async () => {
    console.log('function to update dob started')
    for (let i = 0; i < fighters.length; i++) {
        console.log("in loop")
        let fer = fighters[i];
        //  console.log(fer["id"]);
        if (fer) {
            if (fer["fighterId"] && fer["dob"]) {
                let id = fer["fighterId"];
                let fighterId = fer["fighterId"],
                height = fer["height"],
                reach = fer["reach"],
                stance = fer["stance"],
                sLpM = fer["sLpM"],
                slaccuracy = fer["slaccuracy"],
                sapminute = fer["sapminute"],
                strdef = fer["strdef"],
                tdavg = fer["tdavg"],
                tdacc = fer["tdacc"],
                tddef = fer["tddef"],
                subattperfifteen = fer["subattperfifteen"],
                nickname = fer["nickname"],
                record = fer["record"];
                let dob = new Date(fer["dob"]);

                try {
                    console.log(id)

                    let fighterStats = await FighterCumulativeStats.findOne({where: {fighterId: id}});
                    let fighter = await Fighter.findOne({where: {id: id}});
                    if (fighterStats){
                        let createFighterStats = await FighterCumulativeStats.update({
                            fighterId,
                             height,
                             reach, 
                             stance, 
                             dob, 
                             sLpM, 
                             slaccuracy, 
                             sapminute, 
                             strdef, 
                             tdavg, 
                             tdacc, 
                             tddef, 
                             subattperfifteen, 
                             nickname,
                             record,
                             fighter_name: fighter.fullName
                        }, {where: { fighterId: fighterId}})
                    } else {
                        let createFighterStats = await FighterCumulativeStats.create({
                            fighterId,
                            height,
                            reach,
                            stance,
                            dob,
                            sLpM,
                            slaccuracy,
                            sapminute,
                            strdef,
                            tdavg,
                            tdacc,
                            tddef,
                            subattperfifteen,
                            nickname,
                            record,
                            fighter_name: fighter.fullName
                        })
                    }


                } catch (error) {
                    console.log("Error saving: ", error)
                }

            }
        }
    }
}

addFighters();