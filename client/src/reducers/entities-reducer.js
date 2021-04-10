import { combineReducers } from 'redux';
import fightersReducer from './fighters-reducer';
import usersReducer from './user_reducer';
import leagueReducer from './league-reducer';
const entities = combineReducers({
    fighters: fightersReducer,
    users: usersReducer,
    league: leagueReducer
});
export default entities;