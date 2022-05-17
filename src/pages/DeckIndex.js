import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
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
    const [cardArray, updateCardArray] = useState([]);
    const [newDeckName, updateNewDeckName] = useState("");
    const [cardCounts, updateCardCounts] = useState([]);
    const {createDeck} = props;

    // MODAL FUNCTIONS
    Modal.setAppElement('#root');

    const createClickHandler = () => {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal(e) {
        e.preventDefault();
        updateNewDeckName("");
        setIsOpen(false);
    }

    const importCardString = (cardString) => {
        let inputCardArray = cardString.split("\n");
        let i = 1;
        let urls = []
        let count = [];
        
        while(inputCardArray[i] !== "" && i < inputCardArray.length) {
            let cardCount = parseInt(inputCardArray[i].slice(0,1));
            let cardName = inputCardArray[i].slice(2);

            urls.push(`https://api.magicthegathering.io/v1/cards?name=${cardName}&limit=5`);
            count.push({name: cardName, count: cardCount});
            i++;
        }
        updateCardCounts(count);

        // https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all
        Promise.all(urls.map(u=>fetch(u))).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(data => {
            updateCardArray([...data]);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        importCardString(e.target["1"].value); 
        updateNewDeckName(e.target["0"].value);
    }

    const generateCardArray = (inputArray, cardCounts) => {
        const retArray = [];

        for(let i=0; i < inputArray.length; i++) {
            let count = cardCounts.find((cardCount)=> inputArray[i].cards[0].name.includes(cardCount.name));
            let cardWithImage = inputArray[i].cards.find((card) => card.imageUrl);
            retArray[i] = {id: inputArray[i].cards[0].id, imageUrl: cardWithImage.imageUrl, count: count.count};
        }

        return(retArray);
    }

    useEffect(() => {
        if(newDeckName !== "" && cardArray.length > 0) {
            let cards = generateCardArray(cardArray, cardCounts);
            createDeck({name: newDeckName, cards: cards});
            updateNewDeckName("");
            setIsOpen(false);
        }
    }, [cardArray, createDeck, newDeckName, cardCounts])

    return(
        props.decks ?
        <div className="Main">
            <div className="deck-title-container">
                <span className="page-title">My Decks</span>
                <Button name="Create" onClick={createClickHandler}><FontAwesomeIcon icon={faPlus} /></Button>
            </div>
            <div className="list-container">
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
                    <input name="deck-name" /> <br /><br />
                    <textarea placeholder="...optionally import cards" name="deck-import" /> <br />
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
                    <textarea name="deck-import" />
                    <Button type="submit"><FontAwesomeIcon icon={faSave} /></Button><Button onClick={closeModal}><FontAwesomeIcon icon={faWindowClose} /></Button>
                </form>
            </Modal>
        </div>
    )
}

export default DeckIndex;