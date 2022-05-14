const CardSearch = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="search">Search: </label>
            <input onChange={props.handleChange} type="text" name="query" id="search" value={props.cardQuery} />
            <button type="submit">Search</button>
        </form>
    );
}

export default CardSearch;