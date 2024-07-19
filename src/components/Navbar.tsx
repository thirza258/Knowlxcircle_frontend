import React, {useState, useContext} from "react";
import { Button } from "react-bootstrap";
import Login from "./Login";
import { Link } from "react-router-dom";
import "../index.css";
import LoginService from "../services/LoginService";
import { AuthContext } from '../AuthContext';  

const Navbar = () => {
  const authContext = useContext(AuthContext);

    if (!authContext) {
        return null;
    }

    const { isAuthenticated, logout } = authContext;

    return (
        <nav id="mainNav" className="navbar navbar-expand-md top-0 w-full bg-white ">
        <div className="container mx-auto px-4">
          <a className="navbar-brand primary-nav text-xl font-bold title" href="#">Knowlxcircle</a>
          <button className="navbar-toggler block md:hidden" aria-controls="navbarResponsive" aria-expanded="false">
            <i className="fa fa-bars"></i>
          </button>
          <div className="hidden md:flex md:items-center md:space-x-4 md:ml-auto">
            <ul className="flex items-center space-x-4">
              <li className="nav-item">
                <a className="nav-link primary-nav" href="/dashboard">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link primary-nav" href="/article">Articles</a>
              </li>
              <li className="nav-item">
                <a className="nav-link primary-nav" href="/circle">Circle</a>
              </li>
            </ul>
            <button className="bg-primary text-white px-4 py-2 rounded-lg">Ask</button>
            <div>
            {isAuthenticated ? (
                <button
                    className="text-white px-4 py-2 rounded-lg bg-primary"
                    onClick={logout}
                >
                    Logout
                </button>
            ) : (
                <Link to="/login">
                    <button className="text-black px-4 py-2 rounded-lg button-login">
                        Login
                    </button>
                </Link>
            )}
            {/* Other Home component content */}
        </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;