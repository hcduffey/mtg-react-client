/**
 * Displays the card image and quantity of that card in the deck detail page for a deck
 */
import { Button } from "react-bulma-components";

const CardListItem = (props) => {

    const deleteSelf = () => {
        props.deleteCard(props.index);
    }

    return(
        <div className="deck-container" key={props.index}>
            <div>
                <img className="card-img" src={props.card.imageUrl} alt="card" />
                <Button onClick={deleteSelf} remove />
            </div>
            <h5>x{props.card.count}</h5>
        </div>
    )
}

export default CardListItem;