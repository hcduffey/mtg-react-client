const CardSearchResults = (props) => {

    const addCard = () => {
       let updatedDecks = [...props.decks];
       updatedDecks[props.id].cards.push({id:props.results.id, imageUrl: props.results.imageUrl});
       props.updateDecks(updatedDecks);     
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