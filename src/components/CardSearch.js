/**
 * Provides the search field for searching for a new card in Deck detail - takes the form submit handler as a prop.
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bulma-components";

const CardSearch = (props) => {
    return(
        <>
            <form onSubmit={props.handleSubmit}>
                <input placeholder="Add Cards..." onChange={props.handleChange} type="text" name="query" id="search" value={props.cardQuery} />
                <Button type="submit"><FontAwesomeIcon icon={faSearchPlus} /></Button>
            </form>
        </>
    );
}

export default CardSearch;