import { Button } from "react-bootstrap";

const CustomButton = (props) => {
    return(<Button variant="outline-primary" onClick={props.clickHandler}>{props.name}</Button>);
}

export default CustomButton;