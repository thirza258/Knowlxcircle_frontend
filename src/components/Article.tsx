import { useEffect, useState } from "react";
import React from "react";
import ArticleService from "../services/ArticleService";
import { ArticleResponse, SectionResponse } from "../types";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

const Article = () => {
  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const { id } = useParams<{ id: string }>();
  const articleId = parseInt(id ?? "");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await ArticleService.getArticlesById(articleId);
        setArticle(articleData);
      } catch (error) {
        console.error("Error fetching the article:", error);
      }
    };

    fetchArticle();
  }, []);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
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
        <div>{article.author}</div>
        <div>Role</div>
      </div>

      {/* Second column, second row */}
      <div className="col-span-4 row-span-1 bg-gray-300 p-4 ">
        {article.sections.map((section) => (
          <div
            key={section.id}
            className="font-bold text-black font-sans text-base"
          >
            {section.order + 1}. {section.body}
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
  );
};

export default Article;
