import { Link, useNavigate } from "react-router-dom";
import { CircleListResponse, CircleResponse } from "../types";
import { useState, useEffect } from "react";
import CircleService from "../services/CircleService";
import Navbar from "./Navbar";

const CircleList = () => {
  const [circles, setCircles] = useState<CircleResponse[] | null>(null);

  const fetchCircles = async () => {
    try {
      const circlesData: CircleListResponse = await CircleService.GetAllCircles();
      console.log("Fetched circles data:", circlesData);
      setCircles(circlesData.circles);
    } catch (error) {
      console.error("Error fetching the circles:", error);
    }
  };

  useEffect(() => {
    fetchCircles();
  }, []);

  useEffect(() => {
    console.log("State circles:", circles);
  }, [circles]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-circle");
  };

  return (
    <>
    <Navbar />
    <div className="flex pt-10">
      <div className="w-[10vw] h-[100vh] bg-black">
        <div className="text-white p-3">
          <p>User</p>
          <p>Role</p>
        </div>
      </div>
      <div className="w-[90vw] ms-3">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Circle</h1>
        </div>
        {circles?  (
          circles.map((circle) => (
            <div key={circle.id}>
              <Link to={`/circle/${circle.id}`}>
                <div className="flex w-full items-center justify-between p-4 border-b bg-gray-200">
                  <div>
                    <h2 className="text-lg font-semibold">{circle.name}</h2>
                    <p className="text-sm">{circle.description}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm mx-4">
                      Sentiment :{" "}
                      <span className="text-green">{circle.sentiment}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mx-4">User: {circle.members}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}

        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full mt-5"
        >
          Create Circle
        </button>
      </div>
    </div>
    </>
  );
};

export default CircleList;
