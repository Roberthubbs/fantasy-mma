import { combineReducers } from 'redux';
import fightersReducer from './fighters-reducer';
import usersReducer from './user_reducer';
import leagueReducer from './league-reducer';
import auctionReducer from './auction-reducer';
import rosterReducer from './roster-reducer';
import playersReducer from './players-reducer';
import fightsReducer from './fights-reducer';
const entities = combineReducers({
    fighters: fightersReducer,
    users: usersReducer,
    league: leagueReducer,
    auction: auctionReducer ,
    players: playersReducer,
    fights: fightsReducer,
    roster: rosterReducer
});
export default entities;