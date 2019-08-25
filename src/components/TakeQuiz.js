import React from 'react';
import Axios from 'axios';
import Slider from 'react-slick';

class TakeQuiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quiz: null,
			resultsCount: [],
			minImageURLLength: 11
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
		// console.log(data);
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
		// console.log('Result Index is: ' + resultIndex);
		let resultsCountTemp = this.state.resultsCount;
		resultsCountTemp[resultIndex] += 1;
		// console.log(resultsCountTemp);
		this.setState({
			resultsCount: resultsCountTemp
		});
		this.nextSlide();
	};

	calculateResult = () => {
		const maxCount = Math.max(...this.state.resultsCount);
		const resultIndexPosition = this.state.resultsCount.indexOf(maxCount);

		// console.log('Max Count is: ' + maxCount);
		// console.log('Index position of result is: ' + resultIndexPosition);

		return resultIndexPosition;
	};

	getResult = () => {
		const resultPosition = this.calculateResult();
		if (resultPosition === -1) {
			return <></>;
		} else {
			// console.log('Result Position ' + resultPosition);
			// console.log(this.state.quiz.results[resultPosition].result);
			const resultContent = [];
			resultContent.push(
				<h2 className='resultTitle'>
					{this.state.quiz.results[resultPosition].result}
				</h2>
			);
			resultContent.push(
				<h3 className='resultCaption'>
					{this.state.quiz.results[resultPosition].resultCaption}
				</h3>
			);
			return (
				<div
					className='resultsImageDiv'
					style={{
						backgroundImage:
							this.state.quiz.results[resultPosition].resultImage &&
							this.state.quiz.results[resultPosition].resultImage.length >
								this.state.minImageURLLength
								? `url(${this.state.quiz.results[resultPosition].resultImage})`
								: 'none',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: '50% 50%'
					}}
				>
					{resultContent}
				</div>
			);
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
				{this.state.quiz && (
					<h3>
						<span className='h3LessEmphasis'>Quiz:</span>
						{this.state.quiz.name}
					</h3>
				)}
				<Slider ref='slider' {...settings}>
					{!this.state.quiz && (
						<div>
							<h3>Loading Quiz!</h3>
						</div>
					)}
					{this.state.quiz && (
						<div>
							<div
								className='questionImageDiv'
								style={{
									backgroundImage:
										this.state.quiz.image.length > this.state.minImageURLLength
											? `url(${this.state.quiz.image})`
											: 'none',
									backgroundSize: 'cover',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: '50% 50%'
								}}
							>
								<h2 className='quizQuestionCaption'>
									{this.state.quiz.caption}
								</h2>
								<button className='quizButton' onClick={this.nextSlide}>
									Get Started
								</button>
							</div>
						</div>
					)}
					{this.state.quiz &&
						this.state.quiz.questions.map(question => {
							return (
								<div>
									<h2>{question.question}</h2>
									<div className='answersContainer'>
										<div className='answersRow'>
											<div
												className='answer answer1'
												onClick={() =>
													this.answerQuestion(question.answer1result)
												}
												style={{
													backgroundImage:
														question.answer1img &&
														question.answer1img.length >
															this.state.minImageURLLength
															? `url(${question.answer1img})`
															: 'none',
													backgroundSize: 'cover',
													backgroundRepeat: 'no-repeat',
													backgroundPosition: '50% 50%'
												}}
											>
												<p className='answerText'>{question.answer1}</p>
											</div>
											<div
												className='answer answer2'
												onClick={() =>
													this.answerQuestion(question.answer2result)
												}
												style={{
													backgroundImage:
														question.answer2img &&
														question.answer2img.length >
															this.state.minImageURLLength
															? `url(${question.answer2img})`
															: 'none',
													backgroundSize: 'cover',
													backgroundRepeat: 'no-repeat',
													backgroundPosition: '50% 50%'
												}}
											>
												<p className='answerText'>{question.answer2}</p>
											</div>
										</div>
										<div className='answersRow'>
											<div
												className='answer answer3'
												onClick={() =>
													this.answerQuestion(question.answer3result)
												}
												style={{
													backgroundImage:
														question.answer3img &&
														question.answer3img.length >
															this.state.minImageURLLength
															? `url(${question.answer3img})`
															: 'none',
													backgroundSize: 'cover',
													backgroundRepeat: 'no-repeat',
													backgroundPosition: '50% 50%'
												}}
											>
												<p className='answerText'>{question.answer3}</p>
											</div>
											<div
												className='answer answer4'
												onClick={() =>
													this.answerQuestion(question.answer4result)
												}
												style={{
													backgroundImage:
														question.answer4img &&
														question.answer4img.length >
															this.state.minImageURLLength
															? `url(${question.answer4img})`
															: 'none',
													backgroundSize: 'cover',
													backgroundRepeat: 'no-repeat',
													backgroundPosition: '50% 50%'
												}}
											>
												<p className='answerText'>{question.answer4}</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					<div>
						{this.state.quiz && this.getResult()}
						<button className='finishQuizButton' onClick={this.props.stopQuiz}>
							Back To Quizzes
						</button>
					</div>
				</Slider>
			</div>
		);
	}
}

export default TakeQuiz;
