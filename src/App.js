import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Cookies from 'js-cookie';
import CreateQuiz from './components/CreateQuiz.js';
import ShowAllQuizzes from './components/ShowAllQuizzes.js';
import TakeQuiz from './components/TakeQuiz.js';
axios.defaults.withCredentials = true;

const baseURL = 'http://localhost:3003';

class App extends React.Component {
  constructor(props) {
    super(props);

<<<<<<< HEAD
    this.state = {
      modalIsOpen: false,
      currentModal: '',
      email: '',
      password: '',
      displayName: '',
      currentUser: Cookies.get('user') || null,
      invalidLogin: false,
      createQuiz: false,
      showQuizzes: true,
      currentQuizId: null
    };
=======
		this.state = {
			modalIsOpen: false,
			currentModal: '',
			email: '',
			password: '',
			displayName: '',
			currentUser: Cookies.get('userid') || null,
			invalidLogin: false,
			createQuiz: false,
			showQuizzes: true,
			currentQuizId: null,
			quizzes: []
		};
>>>>>>> 58f74b6ef3f5713729bc41863ee70e3b5edb8337

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.showCreateQuiz = this.showCreateQuiz.bind(this);
    this.hideCreateQuiz = this.hideCreateQuiz.bind(this);
    this.finishTakingQuiz = this.finishTakingQuiz.bind(this);
    this.takeAQuiz = this.takeAQuiz.bind(this);
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
    const res = await axios.delete(`${baseURL}/sessions`, {});
  }

  showCreateQuiz = () => {
    this.setState({ createQuiz: true, showQuizzes: false });
  };

  hideCreateQuiz = () => {
    this.setState({ createQuiz: false, showQuizzes: true });
  };

  takeAQuiz = id => {
    this.setState({ createQuiz: false, showQuizzes: false, currentQuizId: id });
  };

  finishTakingQuiz = () => {
    this.setState({
      createQuiz: false,
      showQuizzes: true,
      currentQuizId: null
    });
  };

  render() {
    return (
      <div>
        <div className='header'>
          <a href='/'>
            <h1>The Knowledge</h1>
          </a>
          <div className='account'>
            {this.state.currentUser && (
              <>
                {/* <p>Current User: {this.state.currentUser}</p> */}
                {!this.state.createQuiz && (
                  <button
                    className='headerButton headerButtonImportant'
                    onClick={this.showCreateQuiz}
                  >
                    Create Quiz
                  </button>
                )}
              </>
            )}
            {this.state.createQuiz && (
              <button
                className='headerButton headerButtonImportantRed'
                onClick={this.hideCreateQuiz}
              >
                Cancel Create Quiz
              </button>
            )}
            {this.state.currentUser !== null ? (
              <button className='headerButton' onClick={this.handleLogOut}>
                Log Out
              </button>
            ) : (
              <>
                <button
                  className='headerButton headerButtonImportant'
                  onClick={() => this.openModal('create')}
                >
                  Create Account
                </button>
                <button
                  className='headerButton'
                  onClick={() => this.openModal('login')}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>

<<<<<<< HEAD
        {/* Create Account Modal */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          className='modal'
          overlayClassName='overlay'
        >
          {this.state.currentModal === 'create' ? (
            <>
              <h2 className='modalTitle'>Create Account</h2>
              <button className='closeModal' onClick={this.closeModal}>
                close
              </button>
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
              <h2 className='modalTitle'>Log In</h2>
              <button className='closeModal' onClick={this.closeModal}>
                close
              </button>
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
        <div className='mainBodyParent'>
          <div className='mainBody'>
            {this.state.createQuiz && <CreateQuiz baseURL={baseURL} />}
            {this.state.showQuizzes && (
              <ShowAllQuizzes
                baseURL={baseURL}
                takeQuiz={this.takeAQuiz}
                stopQuiz={this.finishTakingQuiz}
              />
            )}
            {this.state.currentQuizId && (
              <TakeQuiz baseURL={baseURL} quizID={this.state.currentQuizId} />
            )}
            <footer>Created by David &amp; the Peter's</footer>
          </div>
        </div>
      </div>
    );
  }
=======
				{/* Create Account Modal */}
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					ariaHideApp={false}
					className='modal'
					overlayClassName='overlay'
				>
					{this.state.currentModal === 'create' ? (
						<>
							<h2 className='modalTitle'>Create Account</h2>
							<button className='closeModal' onClick={this.closeModal}>
								close
							</button>
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
							<h2 className='modalTitle'>Log In</h2>
							<button className='closeModal' onClick={this.closeModal}>
								close
							</button>
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
				<div className='mainBodyParent'>
					<div className='mainBody'>
						{this.state.createQuiz && <CreateQuiz baseURL={baseURL} />}
						{this.state.showQuizzes && (
							<ShowAllQuizzes
								baseURL={baseURL}
								takeQuiz={this.takeAQuiz}
								deleteQuiz={this.deleteAQuiz}
								stopQuiz={this.finishTakingQuiz}
								quizzes={this.state.quizzes}
								currentUser={this.state.currentUser}
							/>
						)}
						{this.state.currentQuizId && (
							<TakeQuiz baseURL={baseURL} quizID={this.state.currentQuizId} />
						)}
						<footer>Created by David &amp; the Peter's</footer>
					</div>
				</div>
			</div>
		);
	}
>>>>>>> 58f74b6ef3f5713729bc41863ee70e3b5edb8337
}

export default App;
