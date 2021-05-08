import { combineReducers } from 'redux';
import fightersReducer from './fighters-reducer';
import usersReducer from './user_reducer';
import leagueReducer from './league-reducer';
import auctionReducer from './auction-reducer';
import rosterReducer from './roster-reducer';
const entities = combineReducers({
    fighters: fightersReducer,
    users: usersReducer,
    league: leagueReducer,
    auction: auctionReducer ,
    roster: rosterReducer
});
export default entities;