import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Questions.css';

import QuestionsAnswered from './Answered';
import QuestionsUnanswered from './Unanswered';

class Questions extends Component {
	render() {
		if (this.props.authedUser === null) {
			return (
				<div id='loggedout'>
					Please log in to access this feature.
				</div>
			);
		} else {
			const { listAnswered } = this.props;
			const unansweredClasses = listAnswered ? "selection" : "selection active";
			const answeredClasses = listAnswered ? "selection active" : "selection";
			return (
				<section className='questions'>
					<article>
						<Link to="/" className={unansweredClasses}>
							Unanswered Questions
						</Link>
						<Link to="/answered" className={answeredClasses}>
							Answered Questions
						</Link>
						<ul>
							{listAnswered === false && (<QuestionsUnanswered />)}
							{listAnswered === true && (<QuestionsAnswered />)}
						</ul>
					</article>
				</section>
			);
		}
	}
}

function mapStateToProps( { authedUser, users, questions }, { listAnswered }  ) {
	return {
		authedUser,
		users,
		questions,
		listAnswered
	}
}

export default connect(mapStateToProps)(Questions);