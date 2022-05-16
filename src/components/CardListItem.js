import { Button } from "react-bulma-components";

const CardListItem = (props) => {

    const deleteSelf = () => {
        props.deleteCard(props.index);
    }

    return(
        <div key={props.index}>
            <img className="card-img" src={props.card.imageUrl} alt="card" />
            <Button onClick={deleteSelf} remove />
            <h5>x{props.card.count}</h5>
        </div>
    )
}

export default CardListItem;