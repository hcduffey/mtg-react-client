import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Home = (props) => {
    let token = sessionStorage.getItem('token');
    const [loginError, setLoginError] = useState(false);
    const { state } = useLocation();

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

    if(!token) {
        let message = "";
        if(loginError) {
            message = "Incorrect username or password"
        }
        else if(state) {
            message = "Login or sign-up to view decks!"
        }
        return(
            <div>
                <h1>Login</h1> 
                <h2>{message}</h2>
                <form onSubmit={handleSubmit} >
                    User ID: <input name="userid" /> <br />
                    Password: <input name="password" type="password" /> <br />
                    <button>Login</button><Link to="/">Sign-Up</Link>
                </form>
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