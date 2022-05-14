import { useParams } from "react-router";
import { useState } from "react";
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import CardSearch from "../components/CardSearch";
import CardSearchResults from "../components/CardSearchResults";
import CardList from "../components/CardList";

const DeckDetail = (props) => {
    let { id } = useParams()
    let deck = props.decks[id];

    const [cardQuery, updateCardQuery] = useState("");
    const [results, updateResults] = useState(null);

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
                <h1>{deck.name} <FontAwesomeIcon icon={faEdit} /></h1>
                <CardList id={id} decks={props.decks} updateDecks={props.updateDecks} />
                <CardSearch cardQuery={cardQuery} handleSubmit={handleSubmit} handleChange={handleChange} />
                <CardSearchResults id={id} results={results} decks={props.decks} updateDecks={props.updateDecks} />
        </div> 
        : 
        <div>
                <h1>{deck.name} <FontAwesomeIcon icon={faEdit} /></h1>
                <CardList id={id} decks={props.decks} updateDecks={props.updateDecks} />
                <CardSearch cardQuery={cardQuery} handleSubmit={handleSubmit} handleChange={handleChange} />
        </div>      
    );
}

export default DeckDetail;