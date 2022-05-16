import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const DeckName = (props) => {
    let [editing, updateEditing] = useState(false);
    let [newDeckName, updateNewDeckName] = useState(props.currentDeck.name);

    const handleClick = (e) => {
        e.preventDefault();
        
        if(editing) {
            updateEditing(false);
            updateNewDeckName(props.currentDeck.name);
        }
        else {
            updateEditing(true);
        }
    }

    const handleChange = (e) => {
        updateNewDeckName(e.target.value);
    }

    const handleSubmit = (e) => {
        props.updateDeck({...props.deck, name: newDeckName});
        props.updateCurrentDeck();
        e.preventDefault();
        updateEditing(false);
    }

    return(
        editing ?
        <h1><form onSubmit={handleSubmit}><input onChange={handleChange} value={newDeckName} /><button type="submit"><FontAwesomeIcon icon={faSave} /></button><button onClick={handleClick}><FontAwesomeIcon icon={faWindowClose} /></button></form></h1>
        :
        <h1>{props.name} <button onClick={handleClick}><FontAwesomeIcon icon={faEdit} /></button></h1>
    )
}

export default DeckName;