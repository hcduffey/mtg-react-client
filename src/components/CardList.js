/**
 * Uses CardListItem to display all of the cards in a deck, also provides the delete deck function
 */
import { useEffect, useState } from "react";
import CardListItem from "./CardListItem";

const CardList = (props) => {
    const id = props.id
    const decks = props.decks;
    const [deckState, updateDeckState] = useState();

    useEffect(() => {

        if(decks) {
            updateDeckState(decks.find((deck) => deck._id === id));
        }

    }, [decks, id]);

    const deleteCard = (index) => {
        let deckToDeleteCard = deckState;
        deckToDeleteCard.cards[index].count--;  
        if(deckToDeleteCard.cards[index].count === 0) {
            deckToDeleteCard.cards.splice(index,1);
        }
        
        props.updateCurrentDeck(deckToDeleteCard);     
    }
   
    return(
        deckState ?
        deckState.cards.map((card, index) => {
            return(
                <CardListItem key={index} card={card} index={index} deleteCard={deleteCard} />
            )
        })
      
        :
        <h1>Loading cards...</h1>
    )
}

export default CardList;