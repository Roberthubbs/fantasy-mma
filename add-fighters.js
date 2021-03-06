const csv = require('csv-parser');
const fs = require('fs');
//let csvDoc = require('/Users/roberthubert/Desktop/mma-fantasy/csv-doc.csv')
const { Fighter, LeagueFighter, Player, sequelize, LeagueAuction } = require('./server/models');

const addFighters = () => {
    //const fileName = __dirname + '/csv-doc.csv'
    fs.createReadStream('./csv-doc.csv')
        .pipe(csv())
        .on('data', async (row) => {
            let wins = ''
            let losses = '';
            let seenDash = false
            for (let i = 0; i < row.RECORD.length; i++) {
                if (isNaN(parseInt(row.RECORD[i]))) {
                    if (seenDash) {
                        break;
                    }
                    seenDash = true;
                }
                if (!seenDash && !isNaN(parseInt(row.RECORD[i]))) {
                    wins += row.RECORD[i];
                } else if (seenDash && !isNaN(parseInt(row.RECORD[i]))) {
                    losses += row.RECORD[i];
                }
            }
            let nameArr = row.NAME.split(' ');
            let first = nameArr[0];
            let last = nameArr[1];
            let ranking;
            if (parseInt(row.RANK)) {
                ranking = parseInt(row.RANK)
            } else {
                ranking = null
            }
            let fighterObject = {
                firstName: first,
                lastName: last,
                fullName: row.NAME.replace(/([^a-z0-9 ]+)/gi, ''),
                wins: parseInt(wins),
                losses: parseInt(losses),
                ranking: ranking,
                nextOpponent: row.OPPONENT,
                lastWeight: row.WEIGHTCLASS
            }

          
            try {
                let fighter = await Fighter.create(fighterObject)
            } catch (error) {
            }
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        })
       // .catch((err) => console.log(err));
}
    
addFighters();