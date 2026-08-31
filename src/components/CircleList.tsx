import { Link, useNavigate } from "react-router-dom";
import type { CircleListResponse, CircleResponse } from "../types";
import { useState, useEffect } from "react";
import CircleService from "../services/CircleService";
import Navbar from "./Navbar";

const CircleList = () => {
  const [circles, setCircles] = useState<CircleResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchCircles = async (): Promise<void> => {
      try {
        const circlesData: CircleListResponse = await CircleService.GetAllCircles();
        if (!ignore) {
          setCircles(circlesData.circles ?? []);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching the circles:", err);
        if (!ignore) {
          setCircles([]);
          setError("The circles could not be loaded. Please try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void fetchCircles();

    return () => {
      ignore = true;
    };
  }, []);

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
        {loading && <div>Loading...</div>}
        {!loading && error !== null && <div>{error}</div>}
        {!loading && error === null && circles.length === 0 && (
          <div>No circles have been created yet.</div>
        )}
        {!loading &&
          error === null &&
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
          ))}

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
