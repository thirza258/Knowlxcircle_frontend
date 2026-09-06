import { useState } from "react";
import type { KeyboardEvent } from "react";

const Header = () => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (query.trim() === "") {
      return;
    }

    document
      .getElementById("search-query")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header
      className="masthead"
      style={{ backgroundImage: "url('intro-bg.jpg')" }}
    >
      <div
        className="intro-body d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="primary-header title">Search Knowledge</h1>
              <div className="relative mt-5">
                <input
                  type="text"
                  className="search-header text-black w-full px-4 py-2"
                  placeholder="Search... AI-assisted"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="absolute right-0 top-0 h-full px-4 bg-transparent"
                  onClick={handleSearch}
                >
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ color: "black" }}
                  ></i>
                </button>
              </div>
              <p className="primary-nav mt-10 text-[#4A95E7]">
                A free, responsive, one page Bootstrap theme.
                <br />
                Created with love.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
