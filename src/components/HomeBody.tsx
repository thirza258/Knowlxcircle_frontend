import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ReactTyped } from "react-typed";
import CardFunc from "./CardFunc";
import { useAuth } from "../useAuth";
import type { SearchResponse } from "../types";

type HomeBodyProps = {
  response: SearchResponse | null;
  isLoading: boolean;
  error: string | null;
};

const HomeBody = ({ response, isLoading, error }: HomeBodyProps) => {
  const { isAuthenticated } = useAuth();
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  const prompt = response?.prompt ?? "";
  const answer = response?.response ?? "";

  useEffect(() => {
    setIsTypingComplete(false);
  }, [answer]);

  return (
    <div>
      {isAuthenticated && (
        <div className="flex items-center" id="card_function">
          <div className="flex-1">
            <Link to="/article-builder">
              <CardFunc title={"Create Article and Knowledge"} />
            </Link>
          </div>
          <div className="flex-1">
            <Link to="/article">
              <CardFunc title={"Search Knowledge"} />
            </Link>
          </div>
          <div className="flex-1">
            <Link to="/circle">
              <CardFunc title={"Join Circle"} />
            </Link>
          </div>
        </div>
      )}
      <section className="mt-10">
        <h2 className="primary-nav">{prompt}</h2>
        <div className="mt-10">
          {isLoading && <p className="primary-nav">Loading the latest answer...</p>}
          {!isLoading && error !== null && <p className="text-red-500">{error}</p>}
          <div>
            {answer !== "" && !isTypingComplete && (
              <ReactTyped
                strings={[answer]}
                typeSpeed={100}
                loop
                backSpeed={50}
                startDelay={500}
                showCursor
                cursorChar="|"
                onComplete={() => setIsTypingComplete(true)}
              />
            )}
          </div>
          {answer !== "" && isTypingComplete && (
            <div>
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          )}
          <div className="mt-10" id="search-query">
            <div>
              <div className="m-4 border border-black rounded-lg shadow-lg p-4 m-3">
                <div className="flex items-center justify-between p-4 border-b border-black">
                  <div>
                    <h2 className="text-lg font-semibold">title</h2>
                    <p className="text-sm">Author</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeBody;
