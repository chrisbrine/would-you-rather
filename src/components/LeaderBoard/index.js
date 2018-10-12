import React, { Component } from 'react';
import { connect } from 'react-redux';

import './LeaderBoard.css';

import LeaderSingle from './Single';

class LeaderBoard extends Component {
	render() {
		let rank = 1;
		const { users } = this.props;
		const userList = Object.keys(this.props.users).sort((uid1, uid2) => {
			const user1Total = Object.keys(users[uid1].answers).length + users[uid1].questions.length;
			const user2Total = Object.keys(users[uid2].answers).length + users[uid2].questions.length;
			return user1Total < user2Total;
		}).map((uid) => {
			return {
				...users[uid],
				rank: (rank++) - 1,
			};
		});
		return (
			<ul className="leaderboard">
				{userList.map((user, rank) => (
					<li key={user.id}>
						<LeaderSingle user={user} rank={rank} />
					</li>
				))}
			</ul>
		)
	}
}

function mapStateToProps( { authedUser, users, questions } ) {
	return {
		authedUser,
		users,
		questions,
	}
}

export default connect(mapStateToProps)(LeaderBoard);