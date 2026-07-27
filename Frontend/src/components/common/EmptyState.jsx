import { FaInbox } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./EmptyState.css";

function EmptyState({
  icon,
  title = "Nothing here yet",
  subtitle = "Get started by creating something new.",
  actionLabel,
  actionTo,
}) {
  return (
    <div className="empty-box">
      <div className="empty-icon">
        {icon || <FaInbox />}
      </div>

      <h3 className="text-xl font-bold empty-state-title">{title}</h3>
      <p className="text-muted text-sm empty-state-subtitle">{subtitle}</p>

      {actionLabel && actionTo && (
        <Link to={actionTo} className="primary-btn empty-state-btn">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
