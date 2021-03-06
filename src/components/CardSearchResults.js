/**
 * Displays the results of the card search and a button to allow the user to add that card to their deck
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bulma-components";

const CardSearchResults = (props) => {
    const deck = props.decks.find((deck) => deck._id === props.id);

    const addCard = () => {
        // const index = deck.cards.findIndex((card) => card.id === props.results.id)
        const index = deck.cards.findIndex((card) => card.name === props.results.name)

        if(index !== -1) {
            deck.cards[index].count++;
        }
        else {
            deck.cards.push({id:props.results.id, name: props.results.name, imageUrl: props.results.imageUrl, count: 1});
        }

        props.updateCurrentDeck(deck);     
    }

    return(
        <div className="card-results-container">
            <img className="card-img" src={props.results.imageUrl} alt="card" />
            <h3>{props.results.name}</h3>
            <Button onClick={addCard}><FontAwesomeIcon icon={faPlus} /></Button>
        </div>
    );
}

export default CardSearchResults;