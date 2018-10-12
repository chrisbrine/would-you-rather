import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import QuestionSingle from './Single';

class Unanswered extends Component {
	render() {
		const { authedUser, users } = this.props;
		const answers = Object.keys(users[authedUser].answers);
		const questionIds = Object.keys(this.props.questions);
		const questionList = questionIds.filter((index) => {
			return answers.indexOf(index) === -1;
		}).sort((index1, index2) => {
			return this.props.questions[index1].timestamp < this.props.questions[index2].timestamp;
		});
		return (
			<Fragment>
				{questionList.map((question) => (
					<li key={question} className='unanswered'>
						<QuestionSingle id={question} display="list" />
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

export default connect(mapStateToProps)(Unanswered);