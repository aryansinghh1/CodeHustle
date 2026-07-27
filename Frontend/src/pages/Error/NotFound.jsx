import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="auth-page">
      
      <div className="text-center">

        <h1 className="gradient-text notfound-title">
          404
        </h1>

        <h2 className="text-2xl font-bold notfound-heading">
          Page Not Found
        </h2>

        <p className="text-muted text-sm notfound-desc">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className="primary-btn notfound-btn">
          <FaHome />
          Back to Home
        </Link>

      </div>
    </div>
  );
}

export default NotFound;