import React from 'react';
import CreateQuizQuestion from './CreateQuizQuestion.js';
import CreateQuizResult from './CreateQuizResult.js';
import axios from 'axios';

class CreateQuiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quizName: '',
			quizCaption: '',
			quizImage: '',
			questions: [],
			results: [],
			questionsCount: 1,
			resultsCount: 1,
			resultOptions: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
		this.handleChangeResult = this.handleChangeResult.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.addResult = this.addResult.bind(this);
		this.showQuestions = this.showQuestions.bind(this);
		this.showResults = this.showResults.bind(this);
		this.getResultOptions = this.getResultOptions.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.removeResult = this.removeResult.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();

		const response = await axios.post(`${this.props.baseURL}/quizzes`, {
			name: this.state.quizName,
			caption: this.state.quizCaption,
			image: this.state.quizImage,
			questions: this.state.questions,
			results: this.state.results
		});

		console.log('CREATE QUIZ RESPONSE BELOW');
		console.log(response);

		this.setState({});

		this.props.finishCreate();
	}

	handleChange(event) {
		this.setState({ [event.currentTarget.id]: event.currentTarget.value });
	}

	handleChangeQuestion(event, index) {
		const array = this.state.questions;
		// array[index] = { [event.currentTarget.id]: event.currentTarget.value };
		// array[index][event.currentTarget.id] = event.currentTarget.value;

		let existingObject = array[index];
		let newObjectData = { [event.currentTarget.id]: event.currentTarget.value };

		let mergedObjext = { ...existingObject, ...newObjectData };

		array[index] = mergedObjext;

		this.setState({
			questions: array
		});
	}

	handleChangeResult(event, index) {
		const array = this.state.results;
		let existingObject = array[index];
		let newObjectData = { [event.currentTarget.id]: event.currentTarget.value };
		let mergedObjext = { ...existingObject, ...newObjectData };
		array[index] = mergedObjext;
		this.setState({
			results: array
		});
		this.getResultOptions();
	}

	showQuestions = () => {
		let questions = [];
		for (let i = 0; i < this.state.questionsCount; i++) {
			questions.push(
				<CreateQuizQuestion
					questionNumber={i}
					onChange={this.handleChangeQuestion}
					key={'questions' + i}
					resultOptions={this.state.resultOptions}
				/>
			);
		}
		return <>{questions}</>;
	};

	showResults = () => {
		let results = [];
		for (let i = 0; i < this.state.resultsCount; i++) {
			results.push(
				<CreateQuizResult
					resultNumber={i}
					onChange={this.handleChangeResult}
					key={'results' + i}
				/>
			);
		}
		return <>{results}</>;
	};

	addQuestion = event => {
		event.preventDefault();
		this.setState({ questionsCount: this.state.questionsCount + 1 });
	};

	addResult = event => {
		event.preventDefault();
		this.setState({ resultsCount: this.state.resultsCount + 1 });
	};

	removeQuestion = event => {
		event.preventDefault();
		const questions = this.state.questions;
		const position = this.state.questionsCount - 1;

		questions.splice(position, 1);

		this.setState({
			questionsCount: this.state.questionsCount - 1,
			questions: questions
		});
	};

	removeResult = event => {
		event.preventDefault();
		const results = this.state.results;
		const position = this.state.resultsCount - 1;

		results.splice(position, 1);

		this.setState({
			resultsCount: this.state.resultsCount - 1,
			results: results
		});

		this.getResultOptions();
	};

	getResultOptions = () => {
		const resultOptions = [];
		this.state.results.forEach(result => {
			resultOptions.push(result.result);
		});
		this.setState({ resultOptions: resultOptions });
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Create A Quiz!</h2>
				<div className='createSection createSection1'>
					<h3>Step 1</h3>
					<p>Enter your quiz name, caption, and an image url.</p>
					<div className='inputRow inputRowSection1'>
						<input
							type='text'
							id='quizName'
							name='quizName'
							placeholder='Quiz Name'
							onChange={this.handleChange}
							value={this.state.quizName}
							required
						/>
						<input
							type='text'
							id='quizCaption'
							name='quizCaption'
							placeholder='Caption'
							onChange={this.handleChange}
							value={this.state.quizCaption}
							required
						/>
						<input
							type='url'
							id='quizImage'
							name='quizImage'
							placeholder='Image URL'
							onChange={this.handleChange}
							value={this.state.quizImage}
							required
						/>
					</div>
				</div>

				<div className='createSection createSection2'>
					<h3>Step 2</h3>
					<p>
						Enter the potential results for your quiz, each with a title, image
						url, and caption.
					</p>
					{this.showResults()}
					<div className='formButtonsContainer'>
						<button class='createFormButton' onClick={this.addResult}>
							Add Another Result
						</button>
						{this.state.resultsCount > 1 && (
							<button
								class='createFormButton removeButtonRed'
								onClick={this.removeResult}
							>
								Remove Result
							</button>
						)}
					</div>
				</div>

				<div className='createSection createSection3'>
					<h3>Step 3</h3>
					<p>
						Enter the questions for your quiz, each with a question and four
						answers that are each linked to one of your results.
					</p>
					{this.showQuestions()}
					<div className='formButtonsContainer'>
						<button class='createFormButton' onClick={this.addQuestion}>
							Add Another Question
						</button>
						{this.state.questionsCount > 1 && (
							<button
								class='createFormButton removeButtonYellow'
								onClick={this.removeQuestion}
							>
								Remove Question
							</button>
						)}
					</div>
				</div>
				<div className='createQuizButtonContainer'>
					<input class='createQuizButton' type='submit' value='Create Quiz!' />
				</div>
			</form>
		);
	}
}

export default CreateQuiz;
