import React, {useState} from "react";
import { Button } from "react-bootstrap";
import "../index.css";

const Navbar = () => {
    return (
        <nav id="mainNav" className="navbar navbar-expand-md fixed top-0 w-full bg-white ">
        <div className="container mx-auto px-4">
          <a className="navbar-brand primary-nav text-xl font-bold title" href="#">Knowlxcircle</a>
          <button className="navbar-toggler block md:hidden" aria-controls="navbarResponsive" aria-expanded="false">
            <i className="fa fa-bars"></i>
          </button>
          <div className="hidden md:flex md:items-center md:space-x-4 md:ml-auto">
            <ul className="flex items-center space-x-4">
              <li className="nav-item">
                <a className="nav-link primary-nav" href="#about">Courses</a>
              </li>
              <li className="nav-item">
                <a className="nav-link primary-nav" href="#download">Articles</a>
              </li>
              <li className="nav-item">
                <a className="nav-link primary-nav" href="#contact">Circle</a>
              </li>
            </ul>
            <button className="bg-primary text-white px-4 py-2 rounded-lg">Ask</button>
            <button className="text-black px-4 py-2 rounded-lg button-login">Login</button>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;