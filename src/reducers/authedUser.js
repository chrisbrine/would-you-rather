import { SET_AUTHED_USER, LOG_IN } from '../actions/authedUser';

export default function authedUser (state = null, action) {
	switch(action.type) {
		case SET_AUTHED_USER:
		case LOG_IN:
			return action.id;
		default:
			return state;
	}
}