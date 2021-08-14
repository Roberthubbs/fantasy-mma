const fighters = require('./fighter-dob.json');
const { Fighter } = require('../models');
const sequelize = require('sequelize');
const addFighters = async () => {
    console.log('function to update links started')
    console.log(fighters[1])
    for (let i = 0; i < fighters.length; i++){
        console.log("in loop")
        let fer = fighters[i];
      //  console.log(fer["id"]);
        if (fer){
            if (fer["id"] && fer["link"]){
                let id = fer["id"];
                let link = fer["link"]
                try{
                    console.log(id, link)
                    let fighter = await Fighter.update({ link: link }, {
                        where: {
                            id: id
                        }
                    })
                    console.log(fighter);
                    
                    //await fighter.save();
                    // let fighter = await Fighter.findOne({where: {id: id}})
                    // fighter = await fighter.update({link: link});
                    // fighter.save();
                   // console.log(fighter);
                } catch (error) {
                    console.log("Error saving: ", error)
                }
                
            }
        }
    }
}

addFighters();