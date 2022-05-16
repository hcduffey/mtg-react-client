import { Button } from "react-bulma-components";

const CardList = (props) => {

    let currentDeck = props.decks.filter((deck) => deck._id === props.id)[0];

    console.log(currentDeck);

    const deleteCard = () => {
        let deckToUpdateIndex = currentDeck.cards.findIndex((card) => {
            return card.id === props.id
        }); 
        currentDeck.cards.splice(deckToUpdateIndex,1);
        props.updateDecks(currentDeck);     
     }
   
    return(
        currentDeck.cards.map((card, idx) => {
            return(
                <div key={idx}>
                    <img className="card-img" src={card.imageUrl} alt="card" />
                    <Button onClick={deleteCard} remove />
                </div>
            )
        })
    )
}

export default CardList;