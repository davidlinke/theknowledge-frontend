import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

const baseURL = 'http://localhost:3003';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			currentModal: '',
			email: '',
			password: '',
			displayName: '',
			currentUser: Cookies.get('user') || null,
			invalidLogin: false
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCreateAccount = this.handleCreateAccount.bind(this);
		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	openModal(whichModal) {
		this.setState({ modalIsOpen: true, currentModal: whichModal });
	}

	closeModal() {
		this.setState({
			modalIsOpen: false,
			invalidLogin: false,
			email: '',
			password: '',
			displayName: ''
		});
	}

	handleChange(event) {
		this.setState({ [event.currentTarget.id]: event.currentTarget.value });
	}

	async handleCreateAccount(event) {
		event.preventDefault();

		await axios.post(`${baseURL}/users`, {
			email: this.state.email,
			password: this.state.password,
			displayName: this.state.displayName
		});

		this.setState({
			email: '',
			password: '',
			displayName: '',
			modalIsOpen: false
		});
	}

	async handleLogIn(event) {
		event.preventDefault();

		const response = await axios.post(`${baseURL}/sessions`, {
			email: this.state.email,
			password: this.state.password
		});

		if (response.data === 'wrong username or password') {
			this.setState({
				invalidLogin: true
			});
		} else {
			this.setState({
				email: '',
				password: '',
				currentUser: Cookies.get('user'),
				modalIsOpen: false,
				invalidLogin: false
			});
		}
	}

	async handleLogOut(event) {
		this.setState({ currentUser: null });
		await axios.delete(`${baseURL}/sessions`, {});
	}

	render() {
		return (
			<div>
				<h1>The Knowledge</h1>
				{this.state.currentUser !== null ? (
					<button onClick={this.handleLogOut}>Log Out</button>
				) : (
					<>
						<button onClick={() => this.openModal('create')}>
							Create Account
						</button>
						<button onClick={() => this.openModal('login')}>Log In</button>
					</>
				)}
				{/* Create Account Modal */}
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					ariaHideApp={false}
				>
					{this.state.currentModal === 'create' ? (
						<>
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
						</>
					) : (
						<>
							<h2>Log In</h2>
							<button onClick={this.closeModal}>close</button>
							<form onSubmit={this.handleLogIn}>
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
								<input type='submit' value='Log In' />
								{this.state.invalidLogin && <p>Invalid Login, Try Again</p>}
							</form>
						</>
					)}
				</Modal>
				<p>Current User: {this.state.currentUser}</p>
			</div>
		);
	}
}

export default App;
