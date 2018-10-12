import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading';

import './App.css';

import { handleInitialData } from '../../actions/shared';

import Nav from '../Nav';
import LeaderBoard from '../LeaderBoard';
import Questions from '../Questions';
import QuestionNew from '../Questions/New';
import QuestionSingle from '../Questions/Single';
import SignIn from '../SignIn';
import Profile from '../Profile';
import Page404 from '../Page404';

class App extends Component {
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(handleInitialData());
	}
	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					{this.props.loaded === false ? null 
					: (
						<Fragment>
							<header>
								<Nav />
							</header>
							{this.props.authedUser === null
							? <Route path='/' component={SignIn} />
							: (
							<Switch>
								<Route path='/' exact component={() => <Questions listAnswered={false} />} />
								<Route path='/questions' exact component={() => <Questions listAnswered={false} />} />
								<Route path='/answered' exact component={() => <Questions listAnswered={true} />} />
								<Route path='/add' exact component={QuestionNew} />
								<Route path='/leaderboard' exact component={LeaderBoard} />
								<Route path='/questions/:id' component={(props) => {
									const qid = props.match.params.id;
									if (this.props.questions[qid] === undefined) {
										return (
											<Route component={Page404} />
										);
									} else {
										return (
											<section className='question-single'>
												<article>
													<div className='question-single-container'>
														<QuestionSingle id={props.match.params.id} />
													</div>
												</article>
											</section>
										);
									}
								} } />
								<Route path='/profile' exact component={Profile} />
								<Route component={Page404} />
							</Switch>
							)}
						</Fragment>
					)}
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps ({ loaded, authedUser, questions }) {
	return {
		authedUser,
		loaded,
		questions,
	};
}

export default connect(mapStateToProps)(App);
