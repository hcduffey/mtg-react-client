import { Button, Box, Icon } from "react-bulma-components";

const CardList = (props) => {

    const deleteCard = () => {
        let updatedDecks = [...props.decks];
        let deckToUpdateIndex = updatedDecks[props.id].cards.findIndex((card) => {
            return card.id === props.id
        }); 
        updatedDecks[props.id].cards.splice(deckToUpdateIndex,1);
        props.updateDecks(updatedDecks);     
     }
   
    return(
        props.decks[props.id].cards.map((card, idx) => {
            return(
                <div key={idx}>
                    <Box>
                        <Icon
                            style={{
                            border: '1px solid red'
                            }}
                        >
                            <i className="fas fa-home" />
                        </Icon>
                    </Box>
                    <img src={card.imageUrl} alt="card" />
                    <Button onClick={deleteCard} remove />
                </div>
            )
        })
    )
}

export default CardList;