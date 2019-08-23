import React from 'react';
import Axios from 'axios';

class ShowAllQuizzes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quizzes: []
		};
		this.getQuizzes = this.getQuizzes.bind(this);
	}
	async getQuizzes() {
		const baseURL = this.props.baseURL;
		const response = await Axios(`${baseURL}/quizzes`);
		const data = response.data;
		this.setState({
			quizzes: data
		});
	}

	componentDidMount() {
		this.getQuizzes();
	}

	render() {
		return (
			<div className='allQuizzesContainer'>
				{this.state.quizzes.map(quiz => {
					return (
						<div>
							<h5> {quiz.name} </h5>
							<p> {quiz.caption} </p>
							<img src={quiz.image} />
							<p> {quiz.updatedAt} </p>
							<button onClick={() => this.props.takeQuiz(quiz.id)}>
								Take Quiz
							</button>
						</div>
					);
				})}
			</div>
		);
	}
}

export default ShowAllQuizzes;