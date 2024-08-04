import CardFunc from "./CardFunc";
import { SearchResponse } from "../types";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ReactTyped } from "react-typed";

type HomeBodyProps = {
  response: SearchResponse;
};

const HomeBody = (props: HomeBodyProps) => {
  const [typedText, setTypedText] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  useEffect(() => {
    // Initialize typed text with the response text.
    setTypedText(props.response.response);
    setIsTypingComplete(false); // Reset typing completion when response changes
  }, [props.response.response]);

  const { isAuthenticated } = authContext;

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
        <h2 className="primary-nav">{props.response.prompt}</h2>
        <div className="mt-10">
        <div>
          {!isTypingComplete && (
            <ReactTyped
              strings={[props.response.response]}
              typeSpeed={100}
              loop
              backSpeed={50}
              startDelay={500}
              showCursor
              cursorChar="|"
              onComplete={(self) => {
                setIsTypingComplete(true);
              }}
            />
          )}
          </div>
          {isTypingComplete && (
            <div>
              <ReactMarkdown>{typedText}</ReactMarkdown>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default HomeBody;
