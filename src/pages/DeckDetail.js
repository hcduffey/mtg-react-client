import { useParams } from "react-router";
import { useState } from "react";
import Axios from 'axios';
import CardSearch from "../components/CardSearch";
import CardSearchResults from "../components/CardSearchResults";

const DeckDetail = () => {
    let { id } = useParams()
    let deck = JSON.parse(localStorage.getItem('decks'))[id];

    const [cardQuery, updateCardQuery] = useState("");
    const [results, updateResults] = useState(null);

    async function fetch() {

        const options = {
            method: 'GET',
            url: `https://api.magicthegathering.io/v1/cards?name=${cardQuery}&pageSize=1`,
            headers: {
              'Accept': 'application/json'
            }
          };
    
        let response = await Axios.request(options);
        if(response.status === 200) {
            let resultData = await response.data;
            console.log(resultData);
            updateResults(resultData.cards[0]);
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
                <h1>{deck.name}</h1>
                <CardSearch cardQuery={cardQuery} handleSubmit={handleSubmit} handleChange={handleChange} />
                <CardSearchResults deckId={id} results={results} />
        </div> 
        : 
        <div>
                <h1>{deck.name}</h1>
                <CardSearch cardQuery={cardQuery} handleSubmit={handleSubmit} handleChange={handleChange} />
        </div>      
    );
}

export default DeckDetail;