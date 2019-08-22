import React from 'react';

class CreateQuizQuestion extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.resultOptionsDropdown = this.resultOptionsDropdown.bind(this);
	}

	handleChange(event, index) {
		this.props.onChange(event, index);
	}

	resultOptionsDropdown = () => {
		const rawResults = this.props.resultOptions;
		const results = [];

		results.push(
			<option value='' disabled key={'resultdefault'}>
				Select a Result
			</option>
		);

		rawResults.forEach((item, index) => {
			results.push(
				<option value={index} key={'result' + index}>
					{item}
				</option>
			);
		});

		return <>{results}</>;
	};

	render() {
		return (
			<>
				<h3>Question {this.props.questionNumber + 1}</h3>
				<input
					type='text'
					id='question'
					name='question'
					placeholder='Question'
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
					required
				/>
				<h4>Answer 1</h4>
				<input
					type='text'
					id='answer1'
					name='answer1'
					placeholder='Answer 1'
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
					required
				/>
				<input
					type='text'
					id='answer1img'
					name='answer1img'
					placeholder='Answer 1 Image URL'
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
				/>
				<select
					id='answer1result'
					name='answer1result'
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
					required
					defaultValue=''
				>
					{this.resultOptionsDropdown()}
				</select>
				<h4>Answer 2</h4>
				<input
					type='text'
					id='answer2'
					name='answer2'
					placeholder='Answer 2'
					required
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
				/>
				<input
					type='text'
					id='answer2img'
					name='answer2img'
					placeholder='Answer 2 Image URL'
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
				/>
				<select
					id='answer2result'
					name='answer2result'
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
					required
					defaultValue=''
				>
					{this.resultOptionsDropdown()}
				</select>
				<h4>Answer 3</h4>
				<input
					type='text'
					id='answer3'
					name='answer3'
					placeholder='Answer 3'
					required
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
				/>
				<input
					type='text'
					id='answer3img'
					name='answer3img'
					placeholder='Answer 3 Image URL'
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
				/>
				<select
					id='answer3result'
					name='answer3result'
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
					required
					defaultValue=''
				>
					{this.resultOptionsDropdown()}
				</select>
				<h4>Answer 4</h4>
				<input
					type='text'
					id='answer4'
					name='answer4'
					placeholder='Answer 4'
					required
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
				/>
				<input
					type='text'
					id='answer4img'
					name='answer4img'
					placeholder='Answer 4 Image URL'
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
				/>
				<select
					id='answer4result'
					name='answer4result'
					onChange={event =>
						this.handleChange(event, this.props.questionNumber)
					}
					required
					defaultValue=''
				>
					{this.resultOptionsDropdown()}
				</select>
			</>
		);
	}
}

export default CreateQuizQuestion;
