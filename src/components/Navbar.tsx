import React, {useState} from "react";
import { Button } from "react-bootstrap";
import "../index.css";

const Navbar = () => {
    return (
        <nav id="mainNav" className="navbar navbar-expand-md fixed-top">
            <div className="container">
                <a className="navbar-brand primary-nav title">Knowlxcircle</a>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" type="button" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" value="Menu">
                <i className="fa fa-bars"></i></button>
                <li className="nav-item nav-link"><a className="nav-link primary-nav nav-link" href="#about">Courses</a></li>
                <li className="nav-item nav-link"><a className="nav-link primary-nav nav-link" href="#download">Articles</a></li>
                <li className="nav-item nav-link"><a className="nav-link primary-nav nav-link" href="#contact">Circle</a></li>
        <div id="navbarResponsive" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
                <Button variant="primary" className="nav-button primary-nav">Ask</Button>
                <button className="btn nav-button primary-nav button-login">Login</button>
            </ul>
        </div>
    </div>
    </nav>
    )
}

export default Navbar;