import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const baseURL = 'http://localhost:3003';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			email: '',
			password: '',
			displayName: ''
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCreateAccount = this.handleCreateAccount.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	handleChange(event) {
		this.setState({ [event.currentTarget.id]: event.currentTarget.value });
	}

	async handleCreateAccount(event) {
		event.preventDefault();

		console.log('submitting!');

		const response = await axios.post(`${baseURL}/users`, {
			email: this.state.email,
			password: this.state.password,
			displayName: this.state.displayName
		});

		console.log(response);

		this.setState({
			email: '',
			password: '',
			displayName: ''
		});

		this.setState({ modalIsOpen: false });
	}

	render() {
		return (
			<div>
				<h1>The Knowledge</h1>
				<button onClick={this.openModal}>Create Account</button>
				<Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
					<h2>Create Account</h2>
					<button onClick={this.closeModal}>close</button>
					<p>Create an account in order to make your own quizzes!</p>
					<form onSubmit={this.handleCreateAccount}>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='email'
							onChange={this.handleChange}
							value={this.state.email}
						/>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='password'
							onChange={this.handleChange}
							value={this.state.password}
						/>
						<input
							type='text'
							id='displayName'
							name='displayName'
							placeholder='display name'
							onChange={this.handleChange}
							value={this.state.displayName}
						/>
						<input type='submit' value='Create Account' />
					</form>
				</Modal>
			</div>
		);
	}
}

export default App;
