import React from 'react';

class CreateQuizResult extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, index) {
		this.props.onChange(event, index);
	}

	render() {
		return (
			<>
				<h4>Result {this.props.resultNumber + 1}</h4>
				<div className='inputRow'>
					<input
						type='text'
						id='result'
						name='result'
						placeholder='Result'
						onChange={event =>
							this.handleChange(event, this.props.resultNumber)
						}
						required
					/>
					<input
						type='text'
						id='resultImage'
						name='resultImage'
						placeholder='Result Image URL'
						onChange={event =>
							this.handleChange(event, this.props.resultNumber)
						}
					/>
					<input
						type='text'
						id='resultCaption'
						name='resultCaption'
						placeholder='Result Caption'
						onChange={event =>
							this.handleChange(event, this.props.resultNumber)
						}
						required
					/>
				</div>
			</>
		);
	}
}

export default CreateQuizResult;
