import { useEffect, useRef } from "react";
import CardListItem from "./CardListItem";

const CardList = (props) => {
    const id = props.id
    const decks = props.decks;
    const deck = useRef();

    useEffect(() => {

        if(decks) {
            deck.current = decks.find((deck) => deck._id === id)
        }

    });

    const deleteCard = (index) => {
    
        deck.current.cards[index].count--;  
        if(deck.current.cards[index].count === 0) {
            deck.current.cards.splice(index,1);
        }
        
        props.updateCurrentDeck(deck.current);     
     }
   
    return(
        deck.current ?
        deck.current.cards.map((card, index) => {
            return(
                <CardListItem key={index} card={card} index={index} deleteCard={deleteCard} />
            )
        })
        :
        <h1>Loading cards...</h1>
    )
}

export default CardList;