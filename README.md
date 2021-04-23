# fantasy-mma
Fantasy MMA league alpha project 
DB is postgres with Sequlize ORM.  

fighter structure is:  

    fightBooked: DataTypes.BOOLEAN,  
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    lastFight: DataTypes.DATE,
    nextFight: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
    socialUrl: DataTypes.STRING,
    lastWeight: DataTypes.STRING,
    secondWeight: DataTypes.STRING,
    thirdWeight: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    ranking: DataTypes.INTEGER,
    nextOpponent: DataTypes.STRING
Fight structure is:  

     fighterOne: DataTypes.INTEGER,
    fighterTwo: DataTypes.INTEGER,
    weightClass: DataTypes.STRING
Fight stats structure is table fighter structured as (TODO: add fightID):  

     fighterId: DataTypes.INTEGER,
    fightHappenedOn: DataTypes.DATE,
    takedownAttempted: DataTypes.INTEGER,
    takedownCompleted: DataTypes.INTEGER,
    takedownAttemptAgainst: DataTypes.INTEGER,
    takedownAttemptDefended: DataTypes.INTEGER,
    strikesAttempted: DataTypes.INTEGER,
    strikesLanded: DataTypes.INTEGER,
    significantLanded: DataTypes.INTEGER,
    significantTaken: DataTypes.INTEGER,
    totalStrikesTaken: DataTypes.INTEGER,
    finshed: DataTypes.BOOLEAN,
    won: DataTypes.BOOLEAN,
    wonByKO: DataTypes.BOOLEAN,
    wonBySUB: DataTypes.BOOLEAN,
    lostBySub: DataTypes.BOOLEAN,
    lostByKO: DataTypes.BOOLEAN,
    lost: DataTypes.BOOLEAN


Currently there is also Notifications, League Join Requests, UserLeague, LeagueFighter tables and more.  

Immediate todos are: styling, scraping statistics, and locking down owners league behaviors, such as the auction behavior.


Frontend is React/Redux (building out baseline functionality in React/Redux standard for speed purposes, hope to switch to toolkit/more functional components in the future)

Available components right now is master fighters list (will need to add to local database ask for script to do so) and Fighter single component

to install clone repo and npm install && cd client && npm install
from top dir run npm start, client dir run yarn start
  
