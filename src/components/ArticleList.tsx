import { useEffect, useState } from "react";
import ArticleService from "../services/ArticleService";
import type { ArticleListResponse, ArticleResponse } from "../types";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const fetchArticles = async (): Promise<void> => {
      try {
        const articlesData: ArticleListResponse =
          await ArticleService.getArticles();
        if (!ignore) {
          setArticles(articlesData.articles_list);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching the articles:", err);
        if (!ignore) {
          setArticles([]);
          setError("The articles could not be loaded. Please try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void fetchArticles();

    return () => {
      ignore = true;
    };
  }, []);

  const handleClick = () => {
    navigate('/article-builder');
  };

  const renderArticle = (article: ArticleResponse) => (
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
  );

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="text-3xl text-center font-bold">Article List</h2>
        <div>
          
          <button onClick={handleClick}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg w-full mt-5">Create Article</button>
        </div>
        {loading && <p>Loading articles...</p>}
        {!loading && error !== null && <p>{error}</p>}
        {!loading && error === null && articles.length === 0 && (
          <p>No articles have been published yet.</p>
        )}
        {!loading && error === null && articles.map(renderArticle)}
      </div>

      <Footer />
    </div>
  );
};

export default ArticleList;
