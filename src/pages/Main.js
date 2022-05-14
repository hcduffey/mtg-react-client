import { useState } from "react";
import Button from "../components/Button";
import Deck from "../components/Deck";

const Main = () => {

    const [decks, updateDecks] = useState([{id: 0, name: "Deck 1", cards: []}]);

    console.log(decks);

    const createClickHandler = () => {
        alert('test');
    }

    return(
        <div>
            <h1>In Main</h1>
            <Button name="Create" clickHandler={createClickHandler}/>
            {
                decks.map((deck, idx) => {
                    return(
                        <div key={idx}>
                            <Deck deck={deck} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Main;