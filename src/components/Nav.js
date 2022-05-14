import { Link } from "react-router-dom";

const Nav = () => {
    return(
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
            <Link className="navbar-item" to="/">
                <img src="/images/logo.png" alt="logo"/>
            </Link>
        
            <button className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
            </div>
        
            <div className="navbar-menu">
            <div className="navbar-start">
                <Link to="/" className="navbar-item">
                Home
                </Link>
            </div>
                
            </div>
        </nav> 
    );
}

export default Nav;