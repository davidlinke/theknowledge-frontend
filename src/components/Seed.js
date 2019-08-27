import React from 'react';
import axios from 'axios';

class Seed extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		const baseURL = this.props.baseURL;
		const response = await axios(`${baseURL}/quizzes/seed`);
		console.log(response);
	}

	render() {
		return (
			<div className='center'>
				<button onClick={this.handleSubmit}>SEED QUIZZES</button>
			</div>
		);
	}
}

export default Seed;
