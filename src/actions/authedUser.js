import { showLoading, hideLoading } from 'react-redux-loading';
import { getAuthUsers } from '../utils/api';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOG_IN = 'LOG_IN_USER';

export function setAuthedUser(id = null) {
	return (dispatch) => {
		dispatch(showLoading());

		return getAuthUsers()
			.then((users) => {
				const auth = Object.keys(users).filter(user => user === id);
				auth.length === 0 
					? dispatch(logIn(null)) 
					: dispatch(logIn(id));
			})
			.then(() => dispatch(hideLoading()));
	};
}

export function logIn(id) {
	return {
		type: LOG_IN,
		id,
	};
}
