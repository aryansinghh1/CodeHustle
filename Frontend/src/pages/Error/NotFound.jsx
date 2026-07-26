import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function NotFound() {
  return (
    <div className="auth-page">
      
      <div className="text-center">

        <h1 className="gradient-text" style={{ fontSize: 96, fontWeight: 900, lineHeight: 1 }}>
          404
        </h1>

        <h2 className="text-2xl font-bold" style={{ color: "var(--slate-900)", marginTop: 16 }}>
          Page Not Found
        </h2>

        <p className="text-muted text-sm" style={{ marginTop: 8, maxWidth: 360, margin: "8px auto 0" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className="primary-btn" style={{ marginTop: 24 }}>
          <FaHome />
          Back to Home
        </Link>

      </div>
    </div>
  );
}

export default NotFound;