import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Trophy1 from './Trophy1.svg';
import Trophy2 from './Trophy2.svg';
import Trophy3 from './Trophy3.svg';

class LeaderSingle extends Component {
	render() {
		const { user, rank } = this.props;
		const totalScore = user.questions.length + Object.keys(user.answers).length;
		const trophySize = '32px';
		console.log(user);
		return (
			<div className="leadersingle">
				{rank < 3 && (
					<Fragment>
						<div className="leadericon">
							{rank === 0 ?
								<img 
									src={Trophy1} 
									alt={`Rank ${rank+1}`} 
									className={`rank rank-${rank+1}`}
									style={{ 
										height: trophySize,
										width: trophySize,
									}} 
								/>
							: rank === 1 ? 
								<img 
									src={Trophy2} 
									alt={`Rank ${rank+1}`} 
									className={`rank rank-${rank+1}`}
									style={{ 
										height: trophySize,
										width: trophySize,
									}} 
								/>
							: rank === 2 ?
								<img 
									src={Trophy3} 
									alt={`Rank ${rank+1}`} 
									className={`rank rank-${rank+1}`}
									style={{ 
										height: trophySize,
										width: trophySize,
									}} 
								/>
							: ''
							}
						</div>
						<div className='leaderrank'>
							{rank+1}
						</div>
					</Fragment>
				)}
				<div className='leaderdata'>
					<div className="left">
						<img
							src={user.avatarURL} 
							alt={`Avatar of ${user.name}`} 
							className='avatar' 
							height='128px' 
							width='128px' 
						/>
					</div>
					<div className="middle">
						<h2>{user.name}</h2>
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
					<div className="right">
						<div className="top">
							Score
						</div>
						<div className="bottom">
							<div className='score'>
								{totalScore}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps( { authedUser, users, questions }, { user } ) {
	return {
		authedUser,
		users,
		questions,
		user,
	}
}

export default connect(mapStateToProps)(LeaderSingle);