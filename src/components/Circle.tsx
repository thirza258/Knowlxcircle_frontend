import React, { useState, useEffect } from "react";
import CircleService from "../services/CircleService";
import { SingleCircleResponse } from "../types";
import { useParams, Link } from "react-router-dom";

const Circle = () => {
  const [circle, setCircle] = useState<SingleCircleResponse | null>(null);
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    const fetchCircle = async () => {
      try {
        const circleData: SingleCircleResponse = await CircleService.getCircle(id);
        setCircle(circleData);
      } catch (error) {
        console.error("Error fetching the circle:", error);
      }
    };

    if (id) {
      fetchCircle();
    }
  }, [id]); // Add id to the dependency array

  return (
    <div className="flex p-4">
      <div className="w-[80vw]">
        <div className="h-[50vh]">
          <div>{circle?.name}</div>
          <div>{circle?.description}</div>
        </div>
        <h2>Their Article</h2>
        <div>
          {circle?.article ? circle.article.map((article) => (
            <Link to={`/article/${article.id}`} key={article.id}>
            <div key={article.id} className="flex w-full items-center justify-between p-4 border-b bg-gray-200">
              <div>
                <h2 className="text-lg font-semibold">{article.title}</h2>
                <p className="text-sm">description</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm mx-4">
                  Sentiment: <span className="text-green">Good</span>
                </p>
              </div>
            </div>
            </Link>
          )) : "No articles"}
        </div>
      </div>
      <div className="w-[20vw]">
        <div className="px-4">
          <p>User - Role</p>
        </div>
      </div>
    </div>
  );
};

export default Circle;
