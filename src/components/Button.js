const Button = (props) => {
    return(<button onClick={props.clickHandler}>{props.name}</button>);
}

export default Button;