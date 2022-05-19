/**
 * Provides the name of the deck, and the ability to edit the name of the deck. Used in the DeckDetail page.
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from 'react';
import { Button } from "react-bulma-components";


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
            <div className="deck-title-container">    
                <form className="edit-name-form" onSubmit={handleSubmit}>
                    <input className="edit-deck-input" onChange={handleChange} value={newDeckName} />
                    <Button type="submit"><FontAwesomeIcon icon={faSave} /></Button>
                    <Button onClick={handleClick}><FontAwesomeIcon icon={faWindowClose} /></Button>
                </form>
            </div>
            :
            <>
                <span className="page-title">{deck.current.name}</span> <Button onClick={handleClick}><FontAwesomeIcon icon={faEdit} /></Button>
            </>
        )
    }

    return(
        deck.current ? loaded() : loading()
    )    
}

export default DeckName;