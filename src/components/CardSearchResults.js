const CardSearchResults = (props) => {
    let decks = JSON.parse(localStorage.getItem('decks'));

    const addCard = () => {
        decks[props.deckId].cards.push(props.results.id);
        localStorage.setItem('decks', JSON.stringify(decks));
    }

    return(
        <div>
            <img src={props.results.imageUrl} alt="card" />
            <h3>{props.results.name}</h3>
            <button onClick={addCard}>+</button>
        </div>
    );
}

export default CardSearchResults;