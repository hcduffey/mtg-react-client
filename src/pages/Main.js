import { Routes, Route } from "react-router"
import { useState, useEffect } from "react"
import DeckIndex from "./DeckIndex"
import DeckDetail from "./DeckDetail"
import Home from "./Home"

const Main = (props) => {
    //using local storage until backend is up
    const [decks, updateDecks] = useState(null);
    const {loginSuccess, updateLoginSuccess} = props;
    const [accountSuccess, updateAccountSuccess] = useState(false);
    const [usernameTaken, updateUsernameTaken] = useState(false);

    const url = 'https://mtg-deck-backend.herokuapp.com/decks'; // the URL for my API deployed on heroku
    // const url = 'http://localhost:4000/decks';
    const token = sessionStorage.getItem('token');
    
    /**
     * Fetches all of the Decks from the database to update/sync local state.
     *
     */
    const syncDecks = async () => {
        if(!token) { return }
        
        try {
            let response = await fetch(url, {
                headers: {
                    'x-access-token': token
                }
            });
            let result = await response.json();

            updateDecks(result);
        }
        catch(err) {
            console.log(err);
        }
    }

    /**
     * Creates a new deck in the database and syncs local state
     *
     * @param {deck} deck - a deck object that contains the new deck to be created
     * @return none
     */
    const createDeck = async (deck) => {
        if(!token) { return }

        await fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(deck)
        });

        syncDecks();
    }

    /**
     * Edits/updates and existing deck.
     *
     * @param {deck} deck - a deck object containing the new values
     * @param {string} id - the id of the deck to be updated
     * @return none
     */
    const updateDeck = async (deck, id) => {
        if(!token) { return }

        try {
            await fetch(url + "/" + id, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(deck)
            })
        }
        catch(err) {
            console.log(err);
        }
    
        syncDecks();
    }

    /**
     * Deletes a deck in the database.
     *
     * @param {string} id - The id of the deck to be deleted
     * @return none
     */
    const deleteDeck = async (id) => {
        if(!token) { return }

        await fetch(url + "/" + id, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });

        syncDecks();
    }

    /**
     * We want to call useEffect if user has logged in but haven't their decks yet
     */
    useEffect(() => {
        if(token && !decks) {
            syncDecks();
        }
    });

    return(
        <main>
            <Routes>
                <Route index element={<Home loginSuccess={loginSuccess} syncDecks={syncDecks} updateLoginSuccess={updateLoginSuccess} accountSuccess={accountSuccess} updateAccountSuccess={updateAccountSuccess} usernameTaken={usernameTaken} updateUsernameTaken={updateUsernameTaken} />} />
                <Route path="/decks" element={<DeckIndex decks={decks} createDeck={createDeck} deleteDeck={deleteDeck} loginSuccess={loginSuccess} updateLoginSuccess={updateLoginSuccess} />} />
                <Route path="/decks/:id" element={<DeckDetail decks={decks} updateDeck={updateDeck} loginSuccess={loginSuccess} updateLoginSuccess={updateLoginSuccess} />} />
            </Routes>
        </main>
    )
}

export default Main;