import React, {useState} from "react";
import HomeService from "../services/HomeService";

const Header = () => {
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        
        if (query.trim() !== '') {
            try {
                await HomeService.searchGemini(query);
            } catch (error) {
                console.error('Search failed:', error);
            }
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <header className="masthead" style={{ backgroundImage: "url('intro-bg.jpg')" }}>
        <div className="intro-body d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                        <h1 className="primary-header title">Search Knowledge</h1>
                         <div className="relative mt-5">
                                <input
                                    type="text"
                                    className="search-header text-black w-full px-4 py-2"
                                    placeholder="Search... Boosted with Gemini"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                               <button
                                    className="absolute right-0 top-0 h-full px-4 bg-transparent"
                                    onClick={handleSearch}
                                >
                                    <i className="fa fa-search" style={{ color: 'black' }}></i>
                                </button>



                            </div>
                        <p className="primary-nav mt-10 text-[#4A95E7]">A free, responsive, one page Bootstrap theme.<br />Created with love.</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
    )
}

export default Header;