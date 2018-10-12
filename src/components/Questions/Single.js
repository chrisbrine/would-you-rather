import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { handleVoteQuestion } from '../../actions/questions';

class Single extends Component {
	state = {
		option: 'optionOne',
		reroute: false,
	}
	handleChange = (event) => {
		const option = event.target.value;
		this.setState((prevState) => {
			return {
				...prevState,
				option,
			};
		});
	}
	handleSubmit = (event) => {
		const { dispatch } = this.props;
		event.preventDefault();
		dispatch(handleVoteQuestion(this.props.id, this.state.option));
	}
	getPercentage = (question, option) => {
		const optionOneVotes = question.optionOne.votes.length;
		const optionTwoVotes = question.optionTwo.votes.length;
		const totalVotes = optionOneVotes + optionTwoVotes;
		const choiceVotes = option === 1 ? optionOneVotes : optionTwoVotes;
		const percentageVotes = (choiceVotes / totalVotes) * 100;
		return (
			<div className='progress-bar' style={{ width: '100%' }}>
				<div className='percentage' style={{ width: `${Math.round(percentageVotes)}%`}}>
					{Math.round(percentageVotes)}%&nbsp;&nbsp;
				</div>
			</div>
		);
	}
	getVotes = (question, option) => {
		const optionOneVotes = question.optionOne.votes.length;
		const optionTwoVotes = question.optionTwo.votes.length;
		const totalVotes = optionOneVotes + optionTwoVotes;
		const choiceVotes = option === 1 ? optionOneVotes : optionTwoVotes;
		const voteString = totalVotes < 1
			? "No votes"
			: totalVotes === 1
				? `${choiceVotes} out of ${totalVotes} vote`
				: `${choiceVotes} out of ${totalVotes} votes`;
		return (
			<div className='vote-count'>
				{voteString}
			</div>
		);
	}
	render() {
		const LIST_LABEL = 'list';
		const { users, questions, id, display, authedUser } = this.props;
		const author = users[questions[id].author];
		const user = users[authedUser];
		const { avatarURL, name } = author;
		const { optionOne, optionTwo } = questions[id];
		const voted = (user.answers[id] === 'optionOne') ? 1 :
					(user.answers[id] === 'optionTwo') ? 2 : 0;
		const oneClasses = user.answers[id] === "optionOne" ? "option voted" : "option";
		const twoClasses = user.answers[id] === "optionTwo" ? "option voted" : "option";
		return (
			<div className="question">
				{display === LIST_LABEL && (
					<h3>{name} asks:</h3>
				)}
				{display !== LIST_LABEL && (
					<h3>Asked by {name}</h3>
				)}
				<div className='question-container'>
					<div className='avatar-container'>
						<img 
							src={avatarURL} 
							alt={`Avatar of ${name}`} 
							className='avatar' 
							height='128px' 
							width='128px' 
						/>
					</div>
					<div className="question-detail">
						{display === LIST_LABEL && (
							<div className='unanswered-question'>
								<h4>Would you rather</h4>
								<div className='optionOne option'>{optionOne.text}</div>
								<div className='optionTwo option'>{optionTwo.text}</div>
								<Link to={`/questions/${id}`}>
									<div 
										className='poll-button' 
										data-id={id} 
									>
										View Poll
									</div>
								</Link>
							</div>
						)}
						{display !== LIST_LABEL &&
						voted === 0 && (
							<Fragment>
								<h4>Would You Rather ...</h4>
								<form 
									onSubmit={this.handleSubmit} 
									className="question-form"
								>
									<div className="option-form">
										<input 
											type="radio"
											name="question" 
											value="optionOne" 
											onChange={this.handleChange} 
											checked={this.state.option === 'optionOne'} 
										/>{optionOne.text}
									</div>
									<div className="option-form">
										<input 
											type="radio"
											name="question" 
											value="optionTwo" 
											onChange={this.handleChange} 
											checked={this.state.option === 'optionTwo'} 
										/>{optionTwo.text}
									</div>
									<button>
										Submit
									</button>
								</form>
							</Fragment>
						)}
						{display !== LIST_LABEL &&
						voted > 0 && (
							<Fragment>
								<h4>Results:</h4>
								<div className={oneClasses}>
									{voted === 1 && (
										<div className="voted-tag">
											Your vote
										</div>
									)}
									<div className="option-question">
										Would you rather {optionOne.text}?
									</div>
									{this.getPercentage(questions[id], 1)}
									{this.getVotes(questions[id], 1)}
								</div>
								<div className={twoClasses}>
									{voted === 2 && (
										<div className="voted-tag">
											Your vote
										</div>
									)}
									<div className="option-question">
										Would you rather {optionTwo.text}?
									</div>
									{this.getPercentage(questions[id], 2)}
									{this.getVotes(questions[id], 2)}
								</div>
							</Fragment>
						)}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps( { authedUser, users, questions }, { id, display } ) {
	return {
		authedUser,
		users,
		questions,
		id,
		display,
	}
}

export default connect(mapStateToProps)(Single);