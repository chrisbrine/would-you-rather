import { getInitialData } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

import { logIn } from '../actions/authedUser';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';

export const SET_LOADED = 'SET_LOADED';

const DEFAULT_ID = null;

function setLoaded(loaded) {
	return {
		type: SET_LOADED,
		loaded
	};
}

export function handleInitialData() {
	return (dispatch) => {
		dispatch(setLoaded(false));
		dispatch(showLoading());
		return getInitialData()
			.then(({users, questions}) => {
				dispatch(receiveUsers(users));
				dispatch(receiveQuestions(questions));
				dispatch(logIn(DEFAULT_ID))
				dispatch(setLoaded(true));
				dispatch(hideLoading());
			});
	}
}