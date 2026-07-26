import { FaInbox } from "react-icons/fa";
import { Link } from "react-router-dom";

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

      <h3 className="text-xl font-bold" style={{ color: "var(--slate-800)" }}>{title}</h3>
      <p className="text-muted text-sm" style={{ marginTop: 6, maxWidth: 400 }}>{subtitle}</p>

      {actionLabel && actionTo && (
        <Link to={actionTo} className="primary-btn" style={{ marginTop: 20 }}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
