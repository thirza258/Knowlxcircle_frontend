import { useEffect, useState } from "react";
import ArticleService from "../services/ArticleService";
import type { ArticleResponse, CircleResponse } from "../types";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Dropdown } from "react-bootstrap";
import CircleService from "../services/CircleService";
import Navbar from "./Navbar";

const parseArticleId = (raw: string | undefined): number | null => {
  if (raw === undefined || !/^\d+$/.test(raw)) {
    return null;
  }
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) ? parsed : null;
};

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const articleId = parseArticleId(id);

  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const [circles, setCircles] = useState<CircleResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [circleMessage, setCircleMessage] = useState<string | null>(null);

  useEffect(() => {
    setCircleMessage(null);

    if (articleId === null) {
      setArticle(null);
      setCircles([]);
      setError(null);
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);

    const fetchArticle = async (): Promise<void> => {
      try {
        const articleData: ArticleResponse = await ArticleService.getArticlesById(articleId);
        if (!ignore) {
          setArticle(articleData);
        }
      } catch (err) {
        console.error("Error fetching the article:", err);
        if (!ignore) {
          setArticle(null);
          setError("This article could not be loaded. Please try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    const fetchCircle = async (): Promise<void> => {
      try {
        const circleData = await CircleService.GetAllCircles();
        if (!ignore) {
          setCircles(circleData.circles);
        }
      } catch (err) {
        console.error("Error fetching the circle:", err);
        if (!ignore) {
          setCircles([]);
        }
      }
    };

    void fetchArticle();
    void fetchCircle();

    return () => {
      ignore = true;
    };
  }, [articleId]);

  if (articleId === null) {
    return (
      <>
        <Navbar />
        <div className="p-4">Article not found.</div>
        <Footer />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-4">Loading...</div>
      </>
    );
  }

  if (error !== null || article === null) {
    return (
      <>
        <Navbar />
        <div className="p-4">{error ?? "Article not found."}</div>
        <Footer />
      </>
    );
  }

  const associateWithCircle = async (circleId: number): Promise<void> => {
    setCircleMessage(null);
    try {
      // `associate` deliberately resolves with the envelope, not the payload.
      const result = await CircleService.associate(circleId, articleId);
      if (result.message === "Success") {
        setCircleMessage("Article associated with the circle");
      } else {
        setCircleMessage(result.message);
      }
    } catch (err) {
      console.error("Error updating the article circle:", err);
      setCircleMessage("The article could not be associated with the circle.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="grid grid-cols-5">
      {/* First column, first row */}
      <div className="col-span-1 row-span-1 bg-gray-200 p-4 border-r-2 border-gray-500">{/* Empty */}</div>

      {/* Second column, first row */}
      <div className="col-span-4 row-span-1 bg-gray-300 p-4">
        <h2 className="text-center font-bold text-4xl font-sans bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
          {article.title}
        </h2>
      </div>

      {/* First column, second row */}
      <div className="col-span-1 row-span-1 bg-gray-200 p-4 border-r-2 border-gray-500 h-[100vh]">
        <div>
        <div>{article.author}</div>
        <div>Role</div>
        </div>
        <div>
          <Dropdown>
            {circles.map((circleItem) => (
              <Dropdown.Item
                key={circleItem.id}
                onClick={() => {
                  void associateWithCircle(circleItem.id);
                }}
              >
                {circleItem.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
          {circleMessage !== null && <p>{circleMessage}</p>}
        </div>
      </div>

      {/* Second column, second row */}
      <div className="col-span-4 row-span-1 bg-gray-300 p-4 ">
        {article.sections.map((section) => (
          <div
            key={section.id}
            className="font-bold text-black font-sans text-base"
          >
          <Markdown>
            {`${section.order + 1}. ${section.body}`}
          </Markdown>
          </div>
        ))}
      </div>

      {/* First column, third row */}
      <div className="col-span-1 row-span-1 bg-gray-200 p-4 border-r-2 border-gray-500">
        {/* Empty */}
      </div>

      {/* Second column, third row */}
      <div className="col-span-4 row-span-1 bg-gray-300 p-4 ">
        <div className="font-bold text-black text-center font-sans text-lg">
          <p className="font-bold">Comments</p>
        </div>
        <div className="text-black font-sans text-base">
          <p className="font-bold">Comments</p>
        </div>
      </div>

      <div className="col-span-5 row-span-1  p-4">
        <Footer />
      </div>
    </div>
    </>
  );
};

export default Article;
