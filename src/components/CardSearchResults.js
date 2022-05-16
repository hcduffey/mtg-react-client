const CardSearchResults = (props) => {
    let currentDeck = props.decks.filter((deck) => deck._id === props.id)[0];

    const addCard = () => {
       currentDeck.cards.push({id:props.results.id, imageUrl: props.results.imageUrl});
       props.updateDecks(currentDeck);     
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