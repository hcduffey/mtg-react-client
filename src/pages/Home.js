import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal/lib/components/Modal";
import { Button } from "react-bulma-components";

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
    const { state } = useLocation();
    const {accountSuccess, updateAccountSuccess, usernameTaken, updateUsernameTaken} = props;
    let subtitle; // used for the modal
    const [modalIsOpen, setIsOpen] = useState(false); // used to determine whether to display the modal

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let username=e.target[0].value;
        let password=e.target[1].value;

        e.target[1].value = "";
        submitCredentials({username: username, password: password});
    }

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

    const handleAccountCreate = (e) => {
        e.preventDefault();

        let username=e.target[0].value;
        let password=e.target[1].value;

        createAccount({username: username, password: password});

    }

    if(!token) {
        let message = "";
        if(loginError) {
            message = "Incorrect username or password"
        }
        else if(state) {
            message = "Login or sign-up to view decks!"
        }
        else if(accountSuccess) {
            message = "Account created, login to continue"
        }

        return(
            <div>
                <h1>Login</h1> 
                <h2>{message}</h2>
                <form onSubmit={handleSubmit} >
                    User ID:  <input name="userid" /> <br />
                    Password: <input name="password" type="password" /> <br />
                    <Button>Login</Button><Button name="Create" onClick={signUpClickHandler}>Sign-Up</Button>
                </form>
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Sign-Up Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Account</h2>
                <div>Sign-Up</div>
                {usernameTaken && <div>Username is already in use, choose another</div>}
                <form onSubmit={handleAccountCreate}>
                    Username: <input name="username" /><br />
                    Password: <input name="password" type="password" /> <br />
                    <Button type="submit">Create</Button><Button onClick={closeModal}><FontAwesomeIcon icon={faWindowClose} /></Button>
                </form>
            </Modal>
            </div>
        );
    }

    return(
        <div>
            <h1>Home Page</h1>
            <h3>Welcome, {sessionStorage.getItem('user')}!</h3>
        </div>
    );
}

export default Home;