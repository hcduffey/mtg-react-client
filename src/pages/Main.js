import { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import Button from "../components/Button";
import Deck from "../components/Deck";

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

const Main = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    //using local storage until backend is up
    const [decks, updateDecks] = useState(
        JSON.parse(localStorage.getItem('decks')) || 
        [{id: 0, name: "Deck 1", cards: []}]);

    Modal.setAppElement('#root');

    const createClickHandler = () => {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function createDeck(e) {
        e.preventDefault();
        updateDecks([...decks, {name: e.target["0"].value, id: decks.length, cards:[]}]);
        
        // Using local storage until backend server is working
        localStorage.setItem('decks', JSON.stringify([...decks, {name: e.target["0"].value, id: decks.length, cards:[]}]));
        
        setIsOpen(false);
    }

    return(
        <div className="Main">
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

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Create Deck Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Deck</h2>
                <div>Name of Deck</div>
                <form onSubmit={createDeck}>
                    <input name="deck-name" />
                    <button type="submit">Create</button><button onClick={closeModal}>Cancel</button>
                </form>
            </Modal>
        </div>
    )
}

export default Main;