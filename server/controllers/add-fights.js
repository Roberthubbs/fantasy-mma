const { Fight, FighterOneStats } = require('../models');
const allFights = require('../../allFights.json');
console.log(allFights[0][0].fighterOne);
console.log(allFights[0][0].fighterTwo);

for (let i = 0; i < allFights.length; i++){
    // console.log(allFights[i][0].fighterOne);
    // console.log(allFights[i][0].fighterTwo);
    console.log(allFights[i][0].fighterOne.weightClass);
    let fighter = {
        
    }
}