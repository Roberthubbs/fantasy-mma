const fighters = require('./fighters-collected-stats.json');
const { Fighter, FighterCumulativeStats } = require('../models');
// "fighterId": 4474,
//  "height": "6' 3\"", 
//  "reach": "77\"", 
//  "stance": "Orthodox", 
//  "dob": "Feb 04, 1979", 
//  "sLpM": "3.62", 
//  "slaccuracy": "44%", 
//  "sapminute": "2.95", 
//  "strdef": "57%", 
//  "tdavg": "0.45", 
//  "tdacc": "36%", 
//  "tddef": "78%", 
//  "subattperfifteen": "0.2", 
//  "nickname": "THE PITBULL", 
//  "record": "31-20-0 (2 NC)" 
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
                record = fer["nickname"];
                let dob = new Date(fer["dob"]);

                try {
                    console.log(id)

                    let fighterStats = await FighterCumulativeStats.findOne({where: {fighterId: id}});
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
                             record
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
                            record
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