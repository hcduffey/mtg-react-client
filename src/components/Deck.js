import { Link } from "react-router-dom";
import { Button } from "react-bulma-components";

const Deck = (props) => {
    const handleClick = () => {
        props.deleteDeck(props.deck.id);
    }

    return(
        <>
            <img className="card-img" src="/images/deck.png" alt="deck" /><Button onClick={handleClick} remove />
            <h3><Link to={`/${props.deck.id}`}>{props.deck.name}</Link></h3>
        </>
    );
}

export default Deck;