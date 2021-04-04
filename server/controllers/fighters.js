const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');
const  { Fighter } = require('../models');

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
    try {
        let fighters = await Fighter.findAll({raw: true});
        res.send(fighters)
    } catch (error){
        res.send('Error finding all fighters ', error)
    }

});

router.post('/free-agents', async(req, res) => {
    try {
        let fighters = await Fighter.findAll({where: {teamId: null}})
    } catch (error) {
        res.send('Error finding free agents ', error)
    }

});

module.exports = router;