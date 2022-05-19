// Shows the details of a deck (a visual view of its cards and name) - enables user to add/remove cards and change the name
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bulma-components";
import Modal from "react-modal/lib/components/Modal";
import CardSearch from "../components/CardSearch";
import CardSearchResults from "../components/CardSearchResults";
import CardList from "../components/CardList";
import DeckName from "../components/DeckName";

// style used to pass to the modal function provided by react-modal
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

const DeckDetail = (props) => {
    let navigate = useNavigate();
    let token = sessionStorage.getItem('token');

    let subtitle; // used for the modal
    const [modalIsOpen, setIsOpen] = useState(false); // used to determine whether to display the modal
    let {id} = useParams();
    const decks = props.decks;
    const [cardQuery, updateCardQuery] = useState("");
    const [results, updateResults] = useState(null);
    const [exportText, updateExportText] = useState("");

    const updateCurrentDeck = (editedDeck) => {
        props.updateDeck(editedDeck, id)
    }

    // MODAL FUNCTIONS
    Modal.setAppElement('#root');

    const exportClickHandler = () => {
        updateExportText(generateExport());
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal(e) {
        e.preventDefault();
        setIsOpen(false);
    }
    
    /**
     * Used to get card information from the mtg API for each card in the current deck.
     */
    async function fetch() {

        const options = {
            method: 'GET',
            url: `https://api.magicthegathering.io/v1/cards?name=${cardQuery}&pageSize=10`,
            headers: {
              'Accept': 'application/json'
            }
          };
    
        let response = await Axios.request(options);
        if(response.status === 200) {
            let resultData = await response.data;
            updateResults(resultData.cards.find((card) => card.imageUrl));
        }
        else {
            console.log(response.statusText);
        }
    }

    /**
     * Used to update state for the card search component when the input field changes
     * @param {*} e event from the onChange in the input field
     */
    const handleChange = (e) => {
        updateCardQuery(e.target.value);
    }

    /**
     * Calls the fetch function to search the MTG API for a card based on the provided 
     * @param {*} e event from the form submission
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch();
    }

    const generateExport = () => {
        let retString = "Deck\n";

        let cardArray = [...decks.find((deck) => deck._id === id).cards];

        for(let i=0; i<cardArray.length; i++) {
            retString += cardArray[i].count + " " + cardArray[i].name + "\n";
        }
        return(retString);
    }

    if(!token) {
        navigate("/", {state: {needLogin: true}});
    }

    return(
        results ?
        <div>
            <div className="deck-title-container">
                <DeckName id={id} decks={props.decks} updateCurrentDeck={updateCurrentDeck} /><Button name="export-button" onClick={exportClickHandler}><FontAwesomeIcon icon={faFileExport} /></Button> 
            </div>
            <div className="deck-detail-container">
                <div className="list-container">
                    <CardList id={id} decks={props.decks} updateCurrentDeck={updateCurrentDeck} />
                </div>
                <div className="card-search-container">
                    <CardSearch cardQuery={cardQuery} handleSubmit={handleSubmit} handleChange={handleChange} />
                    <CardSearchResults id={id} decks={props.decks} updateCurrentDeck={updateCurrentDeck} results={results} />
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Export Deck Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Export Deck</h2>
                <div>(copy/paste)</div>
                <textarea name="deck-export" defaultValue={exportText} /> <br />
                <Button onClick={closeModal}><FontAwesomeIcon icon={faWindowClose} /></Button> 
            </Modal>
        </div> 
        : 
        <div>
            <div className="deck-title-container">
                <DeckName id={id} decks={props.decks} updateCurrentDeck={updateCurrentDeck} /><Button name="export-button" onClick={exportClickHandler}><FontAwesomeIcon icon={faFileExport} /></Button>
            </div>
            <div className="deck-detail-container">
                <div className="list-container">
                    <CardList id={id} decks={props.decks} updateCurrentDeck={updateCurrentDeck} />
                </div>
                <div className="card-search-container">
                    <CardSearch cardQuery={cardQuery} handleSubmit={handleSubmit} handleChange={handleChange} />
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Export Deck Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Export Deck</h2>
                <div>(copy/paste)</div>
                <textarea name="deck-export" defaultValue={exportText} /> <br />
                <Button onClick={closeModal}><FontAwesomeIcon icon={faWindowClose} /></Button> 
            </Modal>
        </div>      
    );
    
}

export default DeckDetail;