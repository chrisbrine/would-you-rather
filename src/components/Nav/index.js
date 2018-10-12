import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Nav.css';

import { setAuthedUser } from '../../actions/authedUser';

class Nav extends Component {
	handleLogOut = event => {
		const { dispatch } = this.props;
		dispatch(setAuthedUser(null));
	}
	updateNav = () => {
		const path = this.props.location.pathname;
		if (path === '/' || path === '/answered') {
			const elem = document.querySelector('a');
			elem.classList.add('active');
		}
	}
	componentDidUpdate() {
		this.updateNav();
	}
	componentDidMount() {
		this.updateNav();
	}
	render() {
		const { authedUser, users } = this.props;
		const bolLoggedIn = (authedUser !== null) && (authedUser !== undefined);
		return (
			<nav className='nav'>
				<ul>
					<li>
						<NavLink to='/' exact activeClassName='active'>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to='/add' activeClassName='active'>
							New Question
						</NavLink>
					</li>
					<li>
						<NavLink to='/leaderboard' activeClassName='active'>
							Leaderboard
						</NavLink>
					</li>
					{bolLoggedIn && (
						<Fragment>
							<li className='nav-profile'>
								<NavLink to='/profile' activeClassName='active'>
									Hello, {users[authedUser].name}
									<img 
										src={users[authedUser].avatarURL} 
										alt={`Avatar of ${users[authedUser].name}`} 
										className='nav-avatar' 
										height='32px' 
										width='32px' 
									/>
								</NavLink>
							</li>
							<li onClick={this.handleLogOut}>
								<NavLink to={this.props.location.pathname} activeClassName='active'>
									Logout
								</NavLink>
							</li>
						</Fragment>
					)}
				</ul>
			</nav>
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

export default withRouter(connect(mapStateToProps)(Nav));