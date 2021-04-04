import { combineReducers } from 'redux';
import fightersReducer from './fighters-reducer';
const entities = combineReducers({
    fighters: fightersReducer
});
export default entities;