import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SignIn.css';
import img from './SignIn.png';

import { setAuthedUser } from '../../actions/authedUser';

class SignIn extends Component {
	state = {
		currentUser: null,
		img: img,
	}
	handleChange = event => {
		const currentUser = event.target.value === 'Select a user'
			? this.props.authedUser === null
				? null
				: this.props.authedUser
			: event.target.value;
		this.setState(() => {
			return {
				currentUser,
				img: currentUser === null 
					? img
					: this.props.users[currentUser].avatarURL,
			};
		});
	}
	handleSubmit = event => {
		event.preventDefault();
		const { dispatch } = this.props;
		dispatch(setAuthedUser(this.state.currentUser));
		this.setState(() => {
			return {
				currentUser: null,
				img: img,
			};
		});
	}
	render() {
		const { users } = this.props;
		return (
			<section className='signin'>
				<article>
					<div className='top'>
						<h2>Welcome to the Would You Rather App</h2>
						<h3>Please sign in to continue</h3>
					</div>
					{this.state.loading === true ? false : (
					<div className='bottom'>
						<div className='avatar-container'>
							<img 
								src={this.state.img}  
								alt='Sign In Logo' 
								className='logo' 
								height='128px' 
								width='128px' 
							/>
						</div>
						<h4>Sign in</h4>
						<form onSubmit={this.handleSubmit} value={this.state.currentUser}>
							<select 
								onChange={this.handleChange} 
								defaultValue={this.state.currentUser} 
							>
								<option 
									id='userlist' 
									value={null}  
								>Select a user</option>
								{Object.keys(users).map((user) => (
									<option 
										key={user} 
										value={user} 
									>
										{users[user].name}
									</option>
								))}
							</select>
							<button disabled={this.state.currentUser === null}>
								Sign In
							</button>
						</form>
					</div>
					)}
				</article>
			</section>
		);
	}
}

function mapStateToProps( { users, authedUser, loading } ) {
	return {
		users,
		authedUser,
		loading,
	};
}

export default connect(mapStateToProps)(SignIn);