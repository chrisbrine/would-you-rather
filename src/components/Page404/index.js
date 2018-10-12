import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Page404.css';

class Page404 extends Component {
	render() {
		return (
			<section className='page404'>
				<article>
					<h1>404</h1>
					<hr />
					<div className='error'>The requested page was not found.</div>
					<div className='link'><Link to='/'>Go back</Link></div>
				</article>
			</section>
		);
	}
}

export default connect()(Page404);