import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useAuth } from "../useAuth";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAsk = () => {
    navigate("/askbot");
  };

  return (
    <nav id="mainNav" className="navbar navbar-expand-md top-0 w-full bg-white ">
      <div className="container mx-auto px-4">
        <p className="text-xl font-bold title"><Link to="/">Knowlxcircle</Link></p>
        <button
          type="button"
          className="navbar-toggler block md:hidden"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="hidden md:flex md:items-center md:space-x-4 md:ml-auto">
          <ul className="flex items-center space-x-4">
            <li className="nav-item">
              <Link className="nav-link primary-nav" to="/article">Articles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link primary-nav" to="/circle">Circle</Link>
            </li>
          </ul>

          <button type="button" onClick={handleAsk} className="bg-primary text-white px-4 py-2 rounded-lg">Ask</button>

          <div>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link to="/login">
                <button type="button" className="text-black px-4 py-2 rounded-lg button-login">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
