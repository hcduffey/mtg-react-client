import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
    const [isActive, setisActive] = useState(false);

    return(
        // https://stackoverflow.com/questions/55015841/burger-menu-using-bulma-on-react-not-working
        // <nav className="navbar" role="navigation" aria-label="main navigation">
        //     <div className="navbar-brand">
        //     <Link className="navbar-item" to="/">
        //         <img src="/images/logo.png" alt="logo"/>
        //     </Link>
        
        //     <a role="button" href="/#" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        //         <span aria-hidden="true"></span>
        //         <span aria-hidden="true"></span>
        //         <span aria-hidden="true"></span>
        //     </a>
        //     </div>
        
        //     <div className="navbar-menu">
        //     <div className="navbar-start">
        //         <Link to="/" className="navbar-item">
        //         Home
        //         </Link>
        //     </div>
                
        //     </div>
        // </nav> 
        <nav className="navbar has-background-light" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <Link className="navbar-item" to="/">
                <img src="/images/logo.png" alt="logo"/>
            </Link>
            {/* We need the <a> tag to href to nowhere - which creates a warning, the line below disables that warning */}
            {/* eslint-disable-next-line */}
            <a
                onClick={() => { setisActive(!isActive); }}
                role="button"
                className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                href="#"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <Link to="/" className="navbar-item">Home</Link>
          </div>
        </div>
     </nav>
    );
}

export default Nav;