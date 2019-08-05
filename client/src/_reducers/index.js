import { combineReducers } from 'redux';
import { authentication } from './authentication.reducers.js';

const rootReducer = combineReducers({
	authentication,
});

export default rootReducer;