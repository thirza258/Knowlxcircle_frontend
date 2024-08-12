import { useEffect, useState } from "react";
import React from "react";
import ArticleService from "../services/ArticleService";
import { ArticleResponse, SectionResponse, CircleResponse } from "../types";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Dropdown } from "react-bootstrap";
import CircleService from "../services/CircleService";
import Navbar from "./Navbar";

const Article = () => {
  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const { id } = useParams<{ id: string }>();
  const articleId = parseInt(id ?? "");
  const [circle, setCircle] = useState<CircleResponse[] | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await ArticleService.getArticlesById(articleId);
        setArticle(articleData);
      } catch (error) {
        console.error("Error fetching the article:", error);
      }
    };

    const fetchCircle = async () => {
      try {
        const circleData = await CircleService.GetAllCircles();
        setCircle(circleData.circles);
      } catch (error) {
        console.error("Error fetching the circle:", error);
      }
    }

    fetchArticle();
    fetchCircle();
  }, []);

  if (!article) {
    return <div>Loading...</div>;
  }

  const handleCircle = (circleId: number) => async () => {
    try {
      const response = await CircleService.associate(circleId, articleId);
      if (response.message === "Success") {
        alert("Article associated with the circle");
      }
    } catch (error) {
      console.error("Error updating the article circle:", error);
    }
  }

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
            {circle?.map((circle) => (
              <Dropdown.Item key={circle.id} onClick={handleCircle(circle.id)}>{circle.name}</Dropdown.Item>
            ))}
          </Dropdown>
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
