import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal/lib/components/Modal";
import { Button, Heading } from "react-bulma-components";

// style used to pass to the modal function provided by react-modal
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

const Home = (props) => {
    let token = sessionStorage.getItem('token');
    const [loginError, setLoginError] = useState(false);
    let { state } = useLocation();
    const {accountSuccess, updateAccountSuccess, usernameTaken, updateUsernameTaken} = props;
    let subtitle; // used for the modal
    const [modalIsOpen, setIsOpen] = useState(false); // used to determine whether to display the modal
    let message = ""; // used to display bad login, new account created, etc messages

    // MODAL FUNCTIONS
    Modal.setAppElement('#root');

    const signUpClickHandler = (e) => {
        e.preventDefault();
        setIsOpen(true);
    }
    
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal(e) {
        e.preventDefault();
        setIsOpen(false);
    }

    /**
     * Performs the fetch to authenticate a user with the provided username/password
     * @param {*} credentials 
     */
    const submitCredentials = (credentials) => {
        const url = 'https://mtg-deck-backend.herokuapp.com/auth';
        // const url = 'http://localhost:4000/auth';
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials) 
        })
        .then((response) => {
           if(response.ok) {
               return response.json();
           }
           else {
               throw new Error(`Error! status: ${response.status}`);
           }  
        })
        .then((data) => {
            if(data.error) {
                setLoginError(true);
            }
            else {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('user', data.user);
                setLoginError(false);
                props.updateLoginSuccess(true);
            }
        })
        .catch((err) => {
            console.log(err);
            setLoginError(true);
        });
    }

    /**
     * Handles the login, makes a call to submitCredentials function using the provided username/password in the form.
     * @param {*} e event from the form
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        let username=e.target[0].value;
        let password=e.target[1].value;

        e.target[1].value = "";
        submitCredentials({username: username, password: password});
    }

    /**
     * Actually performs the fetch to create an account based on the provided username, password
     * @param {*} credentials 
     */
    const createAccount = (credentials) => {
        const url = 'https://mtg-deck-backend.herokuapp.com/auth/signup';
        // const url = 'http://localhost:4000/auth/signup';
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials) 
        })
        .then((response) => {return response.json()})
        .then((data) => {
            if(data.error) {
                updateUsernameTaken(true);
            }
            else {
                updateUsernameTaken(false);
                updateAccountSuccess(true);
                setIsOpen(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    /**
     * Submits the provided username/password to the /auth/signup api to create an account
     * @param {*} e event passed from the form
     */
    const handleAccountCreate = (e) => {
        e.preventDefault();

        let username=e.target[0].value;
        let password=e.target[1].value;

        createAccount({username: username, password: password});

    }

    useEffect(() => {
        if(message !== "") {
            setLoginError(false);
            state.needLogin = false;
            updateAccountSuccess(false);
        }
    }, [message, state, updateAccountSuccess])

    if(!token) {
        if(loginError) {
            message = "Incorrect username or password"
        }
        // TODO: These below message do not display when they're supposed to
        else if(state) {
            if(state.needLogin) {
                message = "Login or sign-up to view decks!"
            }
        }
        else if(accountSuccess) {
            message = "Account created, login to continue"
        }

        return(
            <div className="home-container">
                <div className="login-container">
                    <Heading>Login</Heading> 
                    <h2>{message}</h2>
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="userid">Username</label>
                        <input className="login-input" name="userid" /> <br />
                        <label htmlFor="userid">Password</label>
                        <input className="login-input" name="password" type="password" /> <br />
                        <Button>Login</Button><Button name="Create" onClick={signUpClickHandler}>Sign-Up</Button>
                    </form>
                </div>
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Sign-Up Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Account</h2>
                <div><Heading>Sign-Up</Heading></div>
                {usernameTaken && <div>Username is already in use, choose another</div>}
                <form onSubmit={handleAccountCreate}>
                    Username<input className="login-input" name="username" /><br />
                    Password<input className="login-input" name="password" type="password" /> <br />
                    <Button className="login-btn" type="submit">Create</Button><Button className="login-btn" onClick={closeModal}><FontAwesomeIcon icon={faWindowClose} /></Button>
                </form>
            </Modal>
            </div>
        );
    }

    return(
        <div className="home-container">
            <Heading className="welcome-title">Welcome to Deckbuilder {sessionStorage.getItem('user')}!</Heading>
        </div>
    );
}

export default Home;