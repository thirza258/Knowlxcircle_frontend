import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Article from "./components/Article";
import ArticleBuilder from "./components/ArticleBuilder";
import Home from "./components/Home";
import { AuthProvider } from "./AuthContext";
import ArticleList from "./components/ArticleList";
import Circle from "./components/Circle";
import CircleList from "./components/CircleList";
import CreateCircle from "./components/CreateCircle";
import Dashboard from "./components/Dashboard";
import UserPage from "./components/UserPage";
import Chatbot from "./components/Chatbot";
import ErrorBoundary from "./components/ErrorBoundary";

const NotFound = () => (
  <div className="mt-20 text-center">
    <h1 className="primary-header title">Page not found</h1>
    <p className="primary-nav mt-5">
      The page you are looking for does not exist or has been moved.
    </p>
    <Link className="primary-nav" to="/">
      Back to home
    </Link>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <div className="mx-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/article" element={<ArticleList />} />
              <Route path="/article-builder" element={<ArticleBuilder />} />
              <Route path="/circle" element={<CircleList />} />
              <Route path="/circle/:id" element={<Circle />} />
              <Route path="/create-circle" element={<CreateCircle />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/askbot" element={<Chatbot />} />
              <Route path="/askbot/:id" element={<Chatbot />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
