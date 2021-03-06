/**
 * Used in Deck index, returns a deck image, the name, and link to that decks detail
 */
import { Link } from "react-router-dom";
import { Button } from "react-bulma-components";

const Deck = (props) => {
    const handleClick = () => {
        props.deleteDeck(props.deck._id);
    }

    return(
        <>
            <img className="deck-img" src="/images/deck.png" alt="deck" /><Button onClick={handleClick} remove />
            <h3><Link to={`/decks/${props.deck._id}`}>{props.deck.name}</Link></h3>
        </>
    );
}

export default Deck;