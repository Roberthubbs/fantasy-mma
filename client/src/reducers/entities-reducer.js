import { combineReducers } from 'redux';
import fightersReducer from './fighters-reducer';
import usersReducer from './user_reducer';
const entities = combineReducers({
    fighters: fightersReducer,
    users: usersReducer
});
export default entities;