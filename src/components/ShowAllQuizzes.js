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
					{this.state.quizzes.map((quiz, index) => {
						return (
							<div
								style={{
									backgroundColor: this.getRandomColor()
								}}
								className='card'
								key={'quizCard' + index}
							>
								<div
									className='subCard'
									onClick={() => this.props.takeQuiz(quiz.id)}
								>
									<h3 className='quizCardTitle'> {quiz.name} </h3>
									<div
										className='quizCardImage'
										style={{
											backgroundImage: quiz.image && `url(${quiz.image})`,
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
											backgroundPosition: '50% 50%'
										}}
									></div>
									<p> {quiz.updatedAt} </p>
								</div>

								{this.props.currentUser === quiz.createdBy ? (
									<button onClick={() => this.deleteAQuiz(quiz.id)}>
										Delete
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
