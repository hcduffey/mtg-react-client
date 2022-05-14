const CardList = (props) => {
   
    return(
        props.decks[props.id].cards.map((card, idx) => {
            console.log(card);
            return(
                <img key={idx} src={card.imageUrl} alt="card" />
            )
        })
    )
}

export default CardList;