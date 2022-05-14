import { Routes, Route } from "react-router"
import { useState } from "react"
import DeckIndex from "./DeckIndex"
import DeckDetail from "./DeckDetail"

const Main = () => {
    //using local storage until backend is up
    const [decks, updateDecks] = useState([]);

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