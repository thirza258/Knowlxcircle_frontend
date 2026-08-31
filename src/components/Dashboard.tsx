import { Link } from "react-router-dom";
import react_image from "../assets/react.svg";
import DashboardCard from "./DashboardCard";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import DashboardService from "../services/DashboardService";
import type { ArticleDashboardListResponse } from "../types";

/**
 * The AI paragraphs are optional in practice: when Gemini is unreachable the
 * backend answers with the rest of the payload and leaves `explain` /
 * `recommendation` empty (or set to its own "unavailable" notice), so the page
 * must render without them instead of handing an empty string to Markdown.
 */
const AI_UNAVAILABLE = "AI insights are not available right now.";

const readText = (value: string | null | undefined): string =>
  typeof value === "string" ? value.trim() : "";

const Dashboard = () => {
  const [data, setData] = useState<ArticleDashboardListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async (): Promise<void> => {
      try {
        const fetchedData: ArticleDashboardListResponse =
          await DashboardService.getData();
        if (!ignore) {
          setData(fetchedData);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching the dashboard data:", err);
        if (!ignore) {
          setData(null);
          setError("The dashboard could not be loaded. Please try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="p-4">Loading the dashboard...</p>
      </div>
    );
  }

  if (error !== null || data === null) {
    return (
      <div>
        <Navbar />
        <p className="p-4">{error ?? "The dashboard could not be loaded."}</p>
        <Footer />
      </div>
    );
  }

  // Guard the collection as well: a partial payload must not blank the page.
  const articles = data.articles ?? [];
  const explain = readText(data.explain);
  const recommendation = readText(data.recommendation);

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
              <p>{data.sentiment}</p>
            </div>
            <div className="bg-gray-300 rounded-lg shadow-lg p-4 m-3 flex-1">
              <p>Knowledge Created: </p>
              <p>{data.count}</p>
            </div>
            <div className="bg-gray-300 rounded-lg shadow-lg p-4 m-3 flex-1">
              <p>Views: </p>
              <p>{data.views}</p>
            </div>
          </div>
          <div className="my-5 r">
            {/* A <div>, not a <p>: Markdown renders block elements, and a <p>
                inside a <p> is invalid DOM nesting. */}
            <div id="AI">
              {explain.length > 0 ? <Markdown>{explain}</Markdown> : <p>{AI_UNAVAILABLE}</p>}
            </div>
          </div>
          <div id="article_analytics">
            {articles.length === 0 ? (
              <p className="m-4">No articles have been published yet.</p>
            ) : (
              articles.map((article) => (
                <DashboardCard key={article.id} article={article} />
              ))
            )}
          </div>
          <div className="m-4">
            {recommendation.length > 0 ? (
              <Markdown>{recommendation}</Markdown>
            ) : (
              <p>{AI_UNAVAILABLE}</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
