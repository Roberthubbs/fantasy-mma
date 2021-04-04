import { combineReducers } from 'redux';
import entities from './entities-reducer';
const rootReducer = combineReducers({
   
    entities: entities
    
});

export default rootReducer;