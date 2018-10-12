import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import QuestionSingle from './Single';

class Answered extends Component {
	render() {
		const { authedUser, users, questions } = this.props;
		const answers = Object.keys(users[authedUser].answers);
		const questionList = answers.map((qid) => {
			return questions[qid];
		}).sort((q1, q2) => {
			return q1.timestamp < q2.timestamp;
		});
		return (
			<Fragment>
				{questionList.map((question) => (
					<li key={question.id}>
						<QuestionSingle id={question.id} display="list" />
					</li>
				))}
			</Fragment>
		);
	}
}

function mapStateToProps( { authedUser, users, questions } ) {
	return {
		authedUser,
		users,
		questions,
	}
}

export default connect(mapStateToProps)(Answered);