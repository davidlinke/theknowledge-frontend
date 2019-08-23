import React from 'react';
import Axios from 'axios';
import Slider from 'react-slick';

class TakeQuiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quiz: null,
			resultsCount: []
		};
		this.getQuiz = this.getQuiz.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
		this.answerQuestion = this.answerQuestion.bind(this);
		this.calculateResult = this.calculateResult.bind(this);
		this.initializeResultsCountArray = this.initializeResultsCountArray.bind(
			this
		);
		this.getResult = this.getResult.bind(this);
	}
	async getQuiz(id) {
		const baseURL = this.props.baseURL;
		const response = await Axios(`${baseURL}/quizzes/${this.props.quizID}`);
		const data = response.data;
		console.log(data);
		this.setState({
			quiz: data
		});
		this.initializeResultsCountArray(data.results.length);
	}

	componentDidMount() {
		this.getQuiz();
	}

	nextSlide() {
		this.refs.slider.slickNext();
	}

	previousSlide() {
		this.refs.slider.slickPrev();
	}

	initializeResultsCountArray = resultsLength => {
		const array = [];
		for (let i = 0; i < resultsLength; i++) {
			array.push(0);
		}
		this.setState({
			resultsCount: array
		});
	};

	answerQuestion = resultIndex => {
		console.log('Result Index is: ' + resultIndex);
		let resultsCountTemp = this.state.resultsCount;
		resultsCountTemp[resultIndex] += 1;
		console.log(resultsCountTemp);
		this.setState({
			resultsCount: resultsCountTemp
		});
		this.nextSlide();
	};

	calculateResult = () => {
		const maxCount = Math.max(...this.state.resultsCount);
		const resultIndexPosition = this.state.resultsCount.indexOf(maxCount);

		console.log('Max Count is: ' + maxCount);
		console.log('Index position of result is: ' + resultIndexPosition);

		return resultIndexPosition;
	};

	getResult = () => {
		const resultPosition = this.calculateResult();
		if (resultPosition === -1) {
			return <></>;
		} else {
			console.log('Result Position ' + resultPosition);
			console.log(this.state.quiz.results[resultPosition].result);
			const resultContent = [];
			resultContent.push(
				<h4>{this.state.quiz.results[resultPosition].result}</h4>
			);
			resultContent.push(
				<h5>{this.state.quiz.results[resultPosition].resultCaption}</h5>
			);
			if (this.state.quiz.results[resultPosition].resultImage) {
				resultContent.push(
					<img src={this.state.quiz.results[resultPosition].resultImage} />
				);
			}
			return <>{resultContent}</>;
		}
	};

	render() {
		const settings = {
			accessibility: false,
			adaptiveHeight: true,
			arrows: false,
			dots: false,
			className: 'innerSliderDiv',
			draggable: false,
			swipe: false,
			touchMove: false,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		return (
			<div>
				{this.state.quiz && <h2>{this.state.quiz.name}</h2>}
				<Slider ref='slider' {...settings}>
					{!this.state.quiz && (
						<div>
							<h4>Loading Quiz!</h4>
						</div>
					)}
					{this.state.quiz && (
						<div>
							<h4>{this.state.quiz.caption}</h4>
							<img src={this.state.quiz.image} width='400px' />
							<button onClick={this.nextSlide}>Get Started</button>
						</div>
					)}
					{this.state.quiz &&
						this.state.quiz.questions.map(question => {
							return (
								<div>
									<h5>{question.question}</h5>
									<div
										className='answer answer1'
										onClick={() => this.answerQuestion(question.answer1result)}
									>
										{question.answer1}
									</div>
									<div
										className='answer answer2'
										onClick={() => this.answerQuestion(question.answer2result)}
									>
										{question.answer2}
									</div>
									<div
										className='answer answer3'
										onClick={() => this.answerQuestion(question.answer3result)}
									>
										{question.answer3}
									</div>
									<div
										className='answer answer4'
										onClick={() => this.answerQuestion(question.answer4result)}
									>
										{question.answer4}
									</div>
								</div>
							);
						})}
					<div>
						<h4>Results</h4>
						{this.state.quiz && this.getResult()}
					</div>
				</Slider>
			</div>
		);
	}
}

export default TakeQuiz;
