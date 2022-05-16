const CardSearchResults = (props) => {
    const deck = props.decks.find((deck) => deck._id === props.id);

    const addCard = () => {
        const index = deck.cards.findIndex((card) => card.id === props.results.id)

        if(index !== -1) {
            deck.cards[index].count++;
        }
        else {
            deck.cards.push({id:props.results.id, imageUrl: props.results.imageUrl, count: 1});
        }
        props.updateCurrentDeck(deck);     
    }

    return(
        <div>
            <img className="card-img" src={props.results.imageUrl} alt="card" />
            <h3>{props.results.name}</h3>
            <button onClick={addCard}>+</button>
        </div>
    );
}

export default CardSearchResults;