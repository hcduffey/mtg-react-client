import { Link } from "react-router-dom";
import { Button } from "react-bulma-components";

const Deck = (props) => {
    return(
        <>
            <img className="card-img" src="/images/deck.png" alt="deck" /><Button onClick={props.deleteDeck} remove />
            <h3><Link to={`/${props.deck.id}`}>{props.deck.name}</Link></h3>
        </>
    );
}

export default Deck;