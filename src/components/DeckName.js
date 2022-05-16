import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from 'react';

const DeckName = (props) => {
    const id = props.id;
    const decks = props.decks;
    const deck = useRef();

    const [newDeckName, updateNewDeckName] = useState(null);
    const [editing, updateEditing] = useState(false);

    useEffect(() => {
        if(decks) {
            deck.current = decks.find(deck => deck._id === id);
            if(newDeckName === null && deck.current) {
                updateNewDeckName(deck.current.name);
            }
        }
    }, [decks, newDeckName, id]);

    const handleClick = (e) => {
        e.preventDefault();
        
        if(editing) {
            updateEditing(false);
            updateNewDeckName(deck.current.name);
        }
        else {
            updateEditing(true);
        }
    }

    const handleChange = (e) => {
        updateNewDeckName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        deck.current.name = newDeckName;
        props.updateCurrentDeck(deck.current);
        updateEditing(false);
    }

    const loading = () => {
        return(
            <h1>Loading...</h1>
        )
    }

    const loaded = () => {
        return(
            editing ?
            <h1><form onSubmit={handleSubmit}><input onChange={handleChange} value={newDeckName} /><button type="submit"><FontAwesomeIcon icon={faSave} /></button><button onClick={handleClick}><FontAwesomeIcon icon={faWindowClose} /></button></form></h1>
            :
            <h1>{deck.current.name} <button onClick={handleClick}><FontAwesomeIcon icon={faEdit} /></button></h1>
        )
    }

    return(
        deck.current ? loaded() : loading()
    )    
}

export default DeckName;