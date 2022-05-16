const CardSearch = (props) => {
    return(
        <>
            <form onSubmit={props.handleSubmit}>
                <input placeholder="Add Cards..." onChange={props.handleChange} type="text" name="query" id="search" value={props.cardQuery} />
                <button type="submit">Search</button>
            </form>
        </>
    );
}

export default CardSearch;