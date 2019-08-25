import React from 'react';
import axios from 'axios';
import moment from 'moment';

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
		const baseURL = this.props.baseURL;
		const response = await axios(`${baseURL}/quizzes`);
		const data = response.data;
		console.log(data);

		// Sort quizzes by most recent at the start of the array
		data.sort(function(a, b) {
			let keyA = new Date(a.createdAt);
			let keyB = new Date(b.createdAt);
			if (keyA > keyB) return -1;
			if (keyA < keyB) return 1;
			return 0;
		});

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
							<div className='card' key={'quizCard' + index}>
								<div
									className='subCard'
									onClick={() => this.props.takeQuiz(quiz.id)}
									style={{
										backgroundColor: this.getRandomColor()
									}}
								>
									<div className='quizCardBadgeContainer'>
										<p className='quizCardBadge quizCardCount'>
											{quiz.count} plays
										</p>
										<p className='quizCardBadge quizCardTime'>
											{' '}
											{moment(quiz.createdAt).format('M/D/YY')}{' '}
										</p>
									</div>
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
								</div>

								{this.props.currentUser === quiz.createdBy ? (
									<button
										className='quizCardButton quizCardButtonDelete'
										onClick={() => this.deleteAQuiz(quiz.id)}
									>
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
