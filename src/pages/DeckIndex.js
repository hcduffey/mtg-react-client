import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faWindowClose, faFileImport } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal/lib/components/Modal";
import { Button } from "react-bulma-components";

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

    // MODAL FUNCTIONS
    Modal.setAppElement('#root');

    const createClickHandler = () => {
        setIsOpen(true);
    }

    const importClickHandler = () => {
        
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal(e) {
        e.preventDefault();
        setIsOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.createDeck({name: e.target["0"].value, cards:[]});
     
        setIsOpen(false);
    }

    return(
        props.decks ?
        <div className="Main">
            <div className="deck-title-container">
                <span className="page-title">My Decks</span>
                <Button name="Create" onClick={createClickHandler}><FontAwesomeIcon icon={faPlus} /></Button>
                <Button name="Create" onClick={importClickHandler}><FontAwesomeIcon icon={faFileImport} /></Button>
            </div>
            <div className="deck-list-container">
                {
                    props.decks.map((deck, idx) => {
                        return(
                            <div className="deck-container" key={idx}>
                                <Deck deck={deck} deleteDeck={props.deleteDeck} /> 
                            </div>
                        )
                    })
                }
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Create Deck Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Deck</h2>
                <div>Name of Deck</div>
                <form onSubmit={handleSubmit}>
                    <input className="create-deck-input" name="deck-name" />
                    <Button type="submit"><FontAwesomeIcon icon={faSave} /></Button><Button onClick={closeModal}><FontAwesomeIcon icon={faWindowClose} /></Button>
                </form>
            </Modal>
        </div>
        :
        <div className="Main">
            <h1>My Decks</h1>
            <Button name="Create" onClick={createClickHandler}><FontAwesomeIcon icon={faPlus} /></Button>
            <h1>Loading your decks...</h1>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Create Deck Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Deck</h2>
                <div>Name of Deck</div>
                <form onSubmit={handleSubmit}>
                    <input name="deck-name" />
                    <Button type="submit"><FontAwesomeIcon icon={faSave} /></Button><Button onClick={closeModal}><FontAwesomeIcon icon={faWindowClose} /></Button>
                </form>
            </Modal>
        </div>
    )
}

export default DeckIndex;