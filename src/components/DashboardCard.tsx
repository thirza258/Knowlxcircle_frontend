import { ArticleDashboard } from "../types";
import React from "react";


type DashboardCardProps = {
    article: ArticleDashboard;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ article }) => {
    return (
        <div className="m-4 border-b bg-gray-300 rounded-lg shadow-lg p-4 m-3">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="text-lg font-semibold">{article.title}</h2>
                <p className="text-sm">Author</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm mx-4">Views: {article.count_view}</p>
                <p className="text-sm mx-4">
                  Sentiment : <span className="text-green">{article.sentiment}</span>
                </p>
              </div>
              <div>
                <button className="btn-primary mr-2 text-white">Edit</button>
                <button className="btn-primary text-white">Delete</button>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm">{article.description}</p>
            </div>
          </div>
    );
}

export default DashboardCard;