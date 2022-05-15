import { Routes, Route } from "react-router"
import { useState, useEffect } from "react"
import DeckIndex from "./DeckIndex"
import DeckDetail from "./DeckDetail"

const Main = () => {
    //using local storage until backend is up
    const [decks, updateDecks] = useState([]);
    const url = 'https://mtg-deck-backend.herokuapp.com/decks';

    const syncDecks = () => {
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateDecks(data);
        })
        .catch(err => console.log(err));
    }

    const showDeck = (id) => {
        fetch(url + "/" + id)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch(err => console.log(err));
    }

    const createDeck = (deck) => {
        fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deck)
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

        syncDecks();
    }

    const updateDeck = (deck, id) => {
        fetch(url + "/" + id, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deck)
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

        syncDecks();
    }

    const deleteDeck = (id) => {
        fetch(url + "/" + id, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

        syncDecks();
    }

    useEffect(() => {
        syncDecks();
    }, []);

    return(
        <main>
            <Routes>
                <Route index element={<DeckIndex decks={decks} updateDecks={updateDecks} />} />
                <Route path="/:id" element={<DeckDetail decks={decks} updateDecks={updateDecks} />} />
            </Routes>
        </main>
    )
}

export default Main;