import { combineReducers } from 'redux';
import entities from './entities-reducer';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    entities: entities,
    errors: errorsReducer,
    
});

export default rootReducer;