// Shows the details of a deck (a visual view of its cards and name) - enables user to add/remove cards and change the name
import { useParams } from "react-router";
import { useState } from "react";
import Axios from 'axios';
import CardSearch from "../components/CardSearch";
import CardSearchResults from "../components/CardSearchResults";
import CardList from "../components/CardList";
import DeckName from "../components/DeckName";

const DeckDetail = (props) => {
    let {id} = useParams();
    const [cardQuery, updateCardQuery] = useState("");
    const [results, updateResults] = useState(null);

    const updateCurrentDeck = (editedDeck) => {
        props.updateDeck(editedDeck, id)
    }
    
    /**
     * Used to get card information from the mtg API for each card in the current deck.
     *
     * @return {string} none
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

    const handleChange = (e) => {
        updateCardQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch();
    }

    return(
        results ?
        <div>
            <DeckName id={id} decks={props.decks} updateCurrentDeck={updateCurrentDeck} /> 
            <div className="deck-detail-container">
                <div className="list-container">
                    <CardList id={id} decks={props.decks} updateCurrentDeck={updateCurrentDeck} />
                </div>
                <div className="card-search-container">
                    <CardSearch cardQuery={cardQuery} handleSubmit={handleSubmit} handleChange={handleChange} />
                    <CardSearchResults id={id} decks={props.decks} updateCurrentDeck={updateCurrentDeck} results={results} />
                </div>
            </div>
        </div> 
        : 
        <div>
            <DeckName id={id} decks={props.decks} updateCurrentDeck={updateCurrentDeck} />
            <div className="deck-detail-container">
                <div className="list-container">
                    <CardList id={id} decks={props.decks} updateCurrentDeck={updateCurrentDeck} />
                </div>
                <div className="card-search-container">
                    <CardSearch cardQuery={cardQuery} handleSubmit={handleSubmit} handleChange={handleChange} />
                </div>
            </div>
        </div>      
    );
    
}

export default DeckDetail;