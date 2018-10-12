import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './Profile.css';

import QuestionSingle from '../Questions/Single';

class Profile extends Component {
	render() {
		const { authedUser, users } = this.props;
		const user = users[authedUser];
		return (
			<Fragment>
				<section id='profile'>
					<article>
						<div id='profile-container'>
							<div id='profile-avatar'>
								<img 
									src={user.avatarURL} 
									alt={`Avatar for ${user.name}`} 
									height='128px' 
									width='128px' 
								/>
							</div>
							<div id='profile-content'>
								<div id='profile-name'>
									<h1>{user.name}</h1>
								</div>
								<div id='profile-data'>
									<div className='questions answered'>
										<span>Answered Questions</span>
										<em>{Object.keys(user.answers).length}</em>
									</div>
									<div className='line'>
										<hr />
									</div>
									<div className='questions created'>
										<span>Created Questions</span>
										<em>{user.questions.length}</em>
									</div>
								</div>
							</div>
						</div>
					</article>
				</section>
				<section className='questions'>
					<article>
						<h1>Your Questions</h1>
						<ul>
							{user.questions.map((question) => (
								<li key={question}>
									<QuestionSingle id={question} display='list' />
								</li>
							))}
						</ul>
					</article>
				</section>
		</Fragment>
		);
	}
}

function mapStateToProps( { authedUser, users, questions, loaded } ) {
	return {
		authedUser,
		users,
		questions,
		loaded,
	}
}

export default connect(mapStateToProps)(Profile);