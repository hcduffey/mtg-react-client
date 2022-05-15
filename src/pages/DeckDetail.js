import { useParams } from "react-router";
import { useState } from "react";
import Axios from 'axios';
import CardSearch from "../components/CardSearch";
import CardSearchResults from "../components/CardSearchResults";
import CardList from "../components/CardList";
import DeckName from "../components/DeckName";

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
            <DeckName name={deck.name} id={id} decks={props.decks} updateDecks={props.updateDecks} />
            <CardList id={id} decks={props.decks} updateDecks={props.updateDecks} />
            <CardSearch cardQuery={cardQuery} handleSubmit={handleSubmit} handleChange={handleChange} />
            <CardSearchResults id={id} results={results} decks={props.decks} updateDecks={props.updateDecks} />
        </div> 
        : 
        <div>
            <DeckName name={deck.name} id={id} decks={props.decks} updateDecks={props.updateDecks} />
            <CardList id={id} decks={props.decks} updateDecks={props.updateDecks} />
            <CardSearch cardQuery={cardQuery} handleSubmit={handleSubmit} handleChange={handleChange} />
        </div>      
    );
}

export default DeckDetail;