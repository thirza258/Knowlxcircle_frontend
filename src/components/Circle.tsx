import { useState, useEffect } from "react";
import CircleService from "../services/CircleService";
import type { SingleCircleResponse } from "../types";
import { useParams, Link } from "react-router-dom";

/**
 * `/circle/:id` accepts whatever the address bar contains, and the backend route
 * is `circles/<int:id>/` - so a junk id has to be rejected here rather than
 * fetched as `circles/NaN/`.
 */
const parseCircleId = (raw: string | undefined): number | null => {
  if (raw === undefined || !/^\d+$/.test(raw)) {
    return null;
  }
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) ? parsed : null;
};

const Circle = () => {
  const { id } = useParams<{ id: string }>();
  const circleId = parseCircleId(id);

  const [circle, setCircle] = useState<SingleCircleResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (circleId === null) {
      setCircle(null);
      setError(null);
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);

    const fetchCircle = async (): Promise<void> => {
      try {
        const circleData: SingleCircleResponse =
          await CircleService.getCircle(String(circleId));
        if (!ignore) {
          setCircle(circleData);
        }
      } catch (err) {
        console.error("Error fetching the circle:", err);
        if (!ignore) {
          setCircle(null);
          setError("This circle could not be loaded. Please try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void fetchCircle();

    // Re-runs whenever the route id changes, so moving between circles refetches.
    return () => {
      ignore = true;
    };
  }, [circleId]);

  if (circleId === null) {
    return <div className="p-4">Circle not found.</div>;
  }

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error !== null || circle === null) {
    return <div className="p-4">{error ?? "Circle not found."}</div>;
  }

  // The backend always sends the key, empty list included - so length, not truthiness.
  const articles = circle.article ?? [];

  return (
    <div className="flex p-4">
      <div className="w-[80vw]">
        <div className="h-[50vh]">
          <div>{circle.name}</div>
          <div>{circle.description}</div>
        </div>
        <h2>Their Article</h2>
        <div>
          {articles.length === 0
            ? "No articles"
            : articles.map((article) => (
                <Link to={`/article/${article.id}`} key={article.id}>
                  <div className="flex w-full items-center justify-between p-4 border-b bg-gray-200">
                    <div>
                      <h2 className="text-lg font-semibold">{article.title}</h2>
                      <p className="text-sm">description</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm mx-4">
                        Sentiment: <span className="text-green">Good</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
      <div className="w-[20vw]">
        <div className="px-4">
          <p>User - Role</p>
        </div>
      </div>
    </div>
  );
};

export default Circle;
