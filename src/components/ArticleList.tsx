import { useEffect, useState } from "react";
import ArticleService from "../services/ArticleService";
import {
  ArticleListResponse,
  ArticleResponse,
  SectionResponse,
} from "../types";
import Footer from "./Footer";
import { Nav } from "react-bootstrap";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState<ArticleListResponse | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData: ArticleListResponse =
          await ArticleService.getArticles();
        console.log("Fetched articles data:", articlesData);
        setArticles(articlesData);
        console.log("State articles:", articles);
      } catch (error) {
        console.error("Error fetching the articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/article-builder');
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="text-3xl text-center font-bold">Article List</h2>
        <div>
          
          <button onClick={handleClick}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg w-full mt-5">Create Article</button>
        </div>
        {articles?.articles_list ? (
          articles.articles_list.map((article) => (
            <Link
              to={`/article/${article.id}`}
              key={article.id}
              className="block"
            >
              <div className="grid grid-cols-5 gap-2 border shadow m-5 rounded-lg">
                <div className="col-span-4 row-span-1 p-3">
                  <h2 className="font-bold text-4xl font-sans bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
                    {article.title}
                  </h2>
                </div>
                <div className="col-span-1 row-span-2 bg-gray-400 w-full h-full flex justify-center items-center">
                  <div>
                  <div>{article.author}</div>
                  <div>role</div>
                  </div>
                  
                </div>
                <div className="col-span-4 row-span-1 p-3">
                  <div className="font-bold text-black font-sans text-base p-2">
                    {article.sections[0]?.body}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading articles...</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ArticleList;
