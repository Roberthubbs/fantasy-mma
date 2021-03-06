require('dotenv').config()
const cors = require('cors')

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const db=require('./server/models/index');
const app = express();
const fightersController = require('./server/controllers/fighters');
const playersController = require('./server/controllers/players-contoller.js');
const leagueController = require('./server/controllers/league-contoller');
const notificationsController = require('./server/controllers/notifications-controller.js');
const rosterController = require('./server/controllers/roster-controller.js');
const fightsController = require('./server/controllers/fights-controller.js');

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, 'client/build')))

    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname + '/client/build/index.html'))
    // })
}
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    })
    next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fightersController);
app.use(playersController);
app.use(leagueController);
app.use(notificationsController);
app.use(rosterController);
app.use(fightsController);


const port = process.env.PORT || 5000;
db.sequelize.sync().then(() => {

    app.listen(port, () => {
        console.log(`App listening on PORT ${port}`)
    })
});

module.exports = app;