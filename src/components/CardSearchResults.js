const CardSearchResults = (props) => {
    return(
    <div>
        <img src={props.results.imageUrl} alt="card" />
        <h3>{props.results.name}</h3>
        <h5>{props.results.id}</h5>
    </div>
    );
}

export default CardSearchResults;