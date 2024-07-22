import CardFunc from "./CardFunc";
import { SearchResponse } from "../types";
import loginService from "../services/LoginService";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";

type HomeBodyProps = {
  response: SearchResponse;
};

const HomeBody = (props: HomeBodyProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

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
        <p className="mt-10">{props.response.response}</p>
      </section>
    </div>
  );
};
export default HomeBody;
