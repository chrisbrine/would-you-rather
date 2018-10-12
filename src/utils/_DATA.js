let users = {
	jedirey: {
		id: 'jedirey',
		name: 'Rey Jedi',
		avatarURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Rey_Star_Wars.png/220px-Rey_Star_Wars.png',
		answers: {
			"8xf0y6ziyjabvozdd253nd": 'optionOne',
			"6ni6ok3ym7mf1p33lnez": 'optionOne',
			"am8ehyc8byjqgar0jgpub9": 'optionTwo',
			"loxhs1bqm25b708cmbf3g": 'optionTwo'
		},
		questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
	},
	darthsidious: {
		id: 'darthsidious',
		name: 'Darth Sidious',
		avatarURL: 'https://vignette.wikia.nocookie.net/starwars/images/d/d8/Emperor_Sidious.png/revision/latest?cb=20130620100935',
		answers: {
			"vthrdm985a262al8qx3do": 'optionOne',
			"xj352vofupe1dqz9emx13r": 'optionTwo',
		},
		questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
	},
	darthvader: {
		id: 'darthvader',
		name: 'Darth Vader',
		avatarURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Darth_Vader.jpg/220px-Darth_Vader.jpg',
		answers: {
			"xj352vofupe1dqz9emx13r": 'optionOne',
			"vthrdm985a262al8qx3do": 'optionTwo',
			"6ni6ok3ym7mf1p33lnez": 'optionOne'
		},
		questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
	}
}

let questions = {
	"8xf0y6ziyjabvozdd253nd": {
		id: '8xf0y6ziyjabvozdd253nd',
		author: 'jedirey',
		timestamp: 1467166872634,
		optionOne: {
			votes: ['jedirey'],
			text: 'have horrible short term memory',
		},
		optionTwo: {
			votes: [],
			text: 'have horrible long term memory'
		}
	},
	"6ni6ok3ym7mf1p33lnez": {
		id: '6ni6ok3ym7mf1p33lnez',
		author: 'darthvader',
		timestamp: 1468479767190,
		optionOne: {
			votes: [],
			text: 'become a superhero',
		},
		optionTwo: {
			votes: ['darthvader', 'jedirey'],
			text: 'become a supervillian'
		}
	},
	"am8ehyc8byjqgar0jgpub9": {
		id: 'am8ehyc8byjqgar0jgpub9',
		author: 'jedirey',
		timestamp: 1488579767190,
		optionOne: {
			votes: [],
			text: 'be telekinetic',
		},
		optionTwo: {
			votes: ['jedirey'],
			text: 'be telepathic'
		}
	},
	"loxhs1bqm25b708cmbf3g": {
		id: 'loxhs1bqm25b708cmbf3g',
		author: 'darthsidious',
		timestamp: 1482579767190,
		optionOne: {
			votes: [],
			text: 'be a front-end developer',
		},
		optionTwo: {
			votes: ['jedirey'],
			text: 'be a back-end developer'
		}
	},
	"vthrdm985a262al8qx3do": {
		id: 'vthrdm985a262al8qx3do',
		author: 'darthsidious',
		timestamp: 1489579767190,
		optionOne: {
			votes: ['darthsidious'],
			text: 'find $50 yourself',
		},
		optionTwo: {
			votes: ['darthvader'],
			text: 'have your best friend find $500'
		}
	},
	"xj352vofupe1dqz9emx13r": {
		id: 'xj352vofupe1dqz9emx13r',
		author: 'darthvader',
		timestamp: 1493579767190,
		optionOne: {
			votes: ['darthvader'],
			text: 'write JavaScript',
		},
		optionTwo: {
			votes: ['darthsidious'],
			text: 'write Swift'
		}
	},
}

function generateUID () {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
	return new Promise((res, rej) => {
		setTimeout(() => res({...users}), 1000)
	})
}

export function _getQuestions () {
	return new Promise((res, rej) => {
		setTimeout(() => res({...questions}), 1000)
	})
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
	return {
		id: generateUID(),
		timestamp: Date.now(),
		author,
		optionOne: {
			votes: [],
			text: optionOneText,
		},
		optionTwo: {
			votes: [],
			text: optionTwoText,
		}
	}
}

export function _saveQuestion (question) {
	return new Promise((res, rej) => {
		const authedUser = question.author;
		const formattedQuestion = formatQuestion(question)

		setTimeout(() => {
			questions = {
				...questions,
				[formattedQuestion.id]: formattedQuestion
			}
			
			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					questions: users[authedUser].questions.concat([formattedQuestion.id])
				}
			}

			res(formattedQuestion)
		}, 1000)
	})
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					answers: {
						...users[authedUser].answers,
						[qid]: answer
					}
				}
			}

			questions = {
				...questions,
				[qid]: {
					...questions[qid],
					[answer]: {
						...questions[qid][answer],
						votes: questions[qid][answer].votes.concat([authedUser])
					}
				}
			}

			res()
		}, 500)
	})
}
