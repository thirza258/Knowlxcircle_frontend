import { Link, useNavigate } from "react-router-dom";
import react_image from "../assets/react.svg";
import DashboardCard from "./DashboardCard";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import DashboardService from "../services/DashboardService";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <h2 className="py-4 text-3xl">Hello User, Welcome to Dashboard</h2>
      <div className="flex">
        <div className="w-[20vw] bg-gray-600 p-4 rounded-lg">
          <a href="#image_analytics" className="text-white">Analytics</a>
          <br></br>
          <a href="#card_analytics" className="text-white">Overall Information</a>
          <br></br>
          <a href="#AI" className="text-white">AI Explain</a>
          <br></br>
          <a href="#article_analytics" className="text-white">Knowldege Analytics</a>
          <br></br>
          <Link to="/create-circle" className="text-white">Create Circle</Link>
          <br></br>
          <Link to="/article-builder" className="text-white">Create Article</Link>

        </div>
        <div className="w-full px-4">
          <div className="overflow-x-auto w-full max-w-screen-lg flex space-x-4 p-6 bg-gray-300 rounded-lg shadow-lg no-scrollbar" id="image_analytics">
            <img
              src={react_image}
              alt="react"
              className="w-1/2 flex-shrink-0"
            />
            <img
              src={react_image}
              alt="react"
              className="w-1/2 flex-shrink-0"
            />
            <img
              src={react_image}
              alt="react"
              className="w-1/2 flex-shrink-0"
            />
            <img
              src={react_image}
              alt="react"
              className="w-1/2 flex-shrink-0"
            />
          </div>
          <div className="flex my-5 justify-center" id="card_analytics">
            <div className="bg-gray-300 rounded-lg shadow-lg p-4 m-3 flex-1">
              <p>Views: </p>
              <p>1234</p>
            </div>
            <div className="bg-gray-300 rounded-lg shadow-lg p-4 m-3 flex-1">
              <p>Overall Sentiment: </p>
              <p>Good</p>
            </div>
            <div className="bg-gray-300 rounded-lg shadow-lg p-4 m-3 flex-1">
              <p>Knowledge Created: </p>
              <p>1234</p>
            </div>
            <div className="bg-gray-300 rounded-lg shadow-lg p-4 m-3 flex-1">
              <p>Views: </p>
              <p>1234</p>
            </div>
          </div>
          <div className="my-5 text-center">
            <div id="AI">
              <p>AI Explain</p>
            </div>
          </div>
          <div id="article_analytics">
          <DashboardCard />
          <DashboardCard />
          </div>
          <div className="m-4">
            Recommendation
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
