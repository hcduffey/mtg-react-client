import { Routes, Route } from "react-router"
import { useState, useEffect } from "react"
import DeckIndex from "./DeckIndex"
import DeckDetail from "./DeckDetail"

const Main = () => {
    //using local storage until backend is up
    const [decks, updateDecks] = useState(null);
    const url = 'https://mtg-deck-backend.herokuapp.com/decks'; // the URL for my API deployed on heroku

    /**
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

    const deleteDeck = async (id) => {
        await fetch(url + "/" + id, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        syncDecks();
    }

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