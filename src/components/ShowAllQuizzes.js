import React from 'react';
import axios from 'axios';

class ShowAllQuizzes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quizzes: [],
			currentColorIndex: 0
		};
		this.getQuizzes = this.getQuizzes.bind(this);
		this.deleteAQuiz = this.deleteAQuiz.bind(this);
		this.getRandomColor = this.getRandomColor.bind(this);
	}

	async getQuizzes() {
		console.log('Getting quizzes');
		const baseURL = this.props.baseURL;
		const response = await axios(`${baseURL}/quizzes`);
		const data = response.data;
		this.setState({
			quizzes: data
		});
	}

	async deleteAQuiz(id) {
		const baseURL = this.props.baseURL;
		await axios.delete(`${baseURL}/quizzes/${id}`);
		console.log('click');
		this.getQuizzes();
	}

	getRandomColor = () => {
		const colors = [
			'var(--blue)',
			'var(--green)',
			'var(--red)',
			'var(--yellow)'
		];

		const randomInt = Math.floor(Math.random() * colors.length);
		return colors[randomInt];
	};

	componentDidMount() {
		this.getQuizzes();
	}

	render() {
		return (
			<div className='allQuizzesContainer'>
				<h2>Check out quizzes better than BuzzFeed's and create your own!</h2>
				<div className='cardContainer'>
					{this.state.quizzes.map(quiz => {
						return (
							<div
								style={{
									backgroundColor: this.getRandomColor()
								}}
								className='card'
							>
								<h5> {quiz.name} </h5>
								<p> {quiz.caption} </p>
								<img src={quiz.image} />
								<p> {quiz.updatedAt} </p>
								<button onClick={() => this.props.takeQuiz(quiz.id)}>
									Take {quiz.name}
								</button>
								{this.props.currentUser === quiz.createdBy ? (
									<button onClick={() => this.deleteAQuiz(quiz.id)}>
										Delete {quiz.name}
									</button>
								) : null}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default ShowAllQuizzes;
