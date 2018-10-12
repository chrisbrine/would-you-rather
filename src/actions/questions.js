import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const VOTE_QUESTION = 'VOTE_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions (questions = {}) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

function addQuestion (question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

function voteQuestion (authedUser, qid, answer) {
	return {
		type: VOTE_QUESTION,
		authedUser,
		qid,
		answer,
	};
}

export function handleAddQuestion(optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestion({
			author: authedUser,
			optionOneText,
			optionTwoText,
			})
			.then((question) => dispatch(addQuestion(question)))
			.then(() => dispatch(hideLoading()));
	};
}

export function handleVoteQuestion(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		const questionPayload = {
			authedUser: authedUser,
			qid,
			answer,
		};

		dispatch(showLoading());
		dispatch(voteQuestion(authedUser, qid, answer));
		return saveQuestionAnswer(questionPayload)
			.then(() => dispatch(hideLoading()));
	};
}