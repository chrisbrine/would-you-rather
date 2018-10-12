import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';

import { SET_LOADED } from '../actions/shared';
import authedUser from './authedUser';
import users from './users';
import questions from './questions';

function loaded(state = false, action) {
	switch(action.type) {
		case SET_LOADED:
			return action.loaded;
		default:
			return state;
	}
}

export default combineReducers({
	authedUser,
	users,
	questions,
	loaded,
	loadingBar: loadingBarReducer,
});