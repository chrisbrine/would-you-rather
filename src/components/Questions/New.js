import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { handleAddQuestion } from '../../actions/questions.js';

class NewQuestion extends Component {
	state = {
		optionOne: '',
		optionTwo: '',
		goHome: false,
	}
	handleChange = event => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}
	handleSubmit = event => {
		event.preventDefault();
		const { dispatch } = this.props;
		const { optionOne, optionTwo } = this.state;
		dispatch(handleAddQuestion(optionOne, optionTwo));
		this.setState(() => {
			return {
				optionOne: '',
				optionTwo: '',
				goHome: true,
			};
		});
	}
	render() {
		if (this.props.authedUser === null) {
			return (
				<div id='loggedout'>
					Please log in to access this feature.
				</div>
			);
		} else {
			if (this.state.goHome === true) {
				return <Redirect to='/' />;
			}
			return (
				<section className='question-new'>
					<article>
						<div className="top">
							<h2>Create New Question</h2>
						</div>
						<div className="bottom">
							<h3>Complete the question:</h3>
							<h4>Would you rather ...</h4>
							<form onSubmit={this.handleSubmit}>
								<input 
									placeholder="Enter Option One Text Here" 
									className="choice" 
									name="optionOne" 
									value={this.state.optionOne} 
									onChange={this.handleChange} 
								/>
								<h5><hr /><span>OR</span><hr /></h5>
								<input 
									placeholder="Enter Option Two Text Here" 
									className="choice" 
									name="optionTwo" 
									value={this.state.optionTwo} 
									onChange={this.handleChange} 
								/>
								<button>
									Submit
								</button>
							</form>
						</div>
						</article>
				</section>
			);
		}
	}
}

function mapStateToProps( { authedUser, users, questions } ) {
	return {
		authedUser,
		users,
		questions,
	}
}

export default connect(mapStateToProps)(NewQuestion);