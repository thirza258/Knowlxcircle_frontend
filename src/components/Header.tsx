import React, {useState} from "react";

const Header = () => {
    return (
        <header className="masthead" style={{ backgroundImage: "url('intro-bg.jpg')" }}>
        <div className="intro-body d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                        <h1 className="primary-header title">Search Knowledge</h1>
                        <input type="text" className="search-header mt-5 text-black" placeholder="Search... Boosted with Gemini" /><i className="fa fa-search"></i>
                        <p className="primary-nav mt-10 text-[#4A95E7]">A free, responsive, one page Bootstrap theme.<br />Created with love.</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
    )
}

export default Header;