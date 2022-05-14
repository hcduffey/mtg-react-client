import { Link } from "react-router-dom";

const Deck = (props) => {
    return(
        <>
            <img className="card-img" src="/images/deck.png" alt="deck" />
            <h3><Link to={`/${props.deck.id}`}>{props.deck.name}</Link></h3>
        </>
    );
}

export default Deck;