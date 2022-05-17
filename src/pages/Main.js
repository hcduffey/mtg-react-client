import { Routes, Route } from "react-router"
import { useState, useEffect } from "react"
import DeckIndex from "./DeckIndex"
import DeckDetail from "./DeckDetail"

const Main = () => {
    //using local storage until backend is up
    const [decks, updateDecks] = useState(null);
    const url = 'https://mtg-deck-backend.herokuapp.com/decks'; // the URL for my API deployed on heroku

    
    /**
     * Fetches all of the Decks from the database to update/sync local state.
     *
     */
    const syncDecks = async () => {
        try {
            let response = await fetch(url);
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
        await fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
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
        try {
            await fetch(url + "/" + id, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
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
        await fetch(url + "/" + id, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        syncDecks();
    }

    /**
     * We want to call useEffect once upon load to get the initial state of the decks from the database.
     */
    useEffect(() => {
        syncDecks();
    }, []);

    return(
        <main>
            <Routes>
                <Route index element={<DeckIndex decks={decks} createDeck={createDeck} deleteDeck={deleteDeck} />} />
                <Route path="/:id" element={<DeckDetail decks={decks} updateDeck={updateDeck} />} />
            </Routes>
        </main>
    )
}

export default Main;