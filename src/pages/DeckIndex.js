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

const DeckIndex = (props) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

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
        props.updateDecks([...props.decks, {name: e.target["0"].value, id: props.decks.length, cards:[]}]);
        
        // Using local storage until backend server is working
        localStorage.setItem('decks', JSON.stringify([...props.decks, {name: e.target["0"].value, id: props.decks.length, cards:[]}]));
        
        setIsOpen(false);
    }

    return(
        <div className="Main">
            <h1>My Decks</h1>
            <Button name="Create" clickHandler={createClickHandler}/>
            {
                props.decks.map((deck, idx) => {
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

export default DeckIndex;