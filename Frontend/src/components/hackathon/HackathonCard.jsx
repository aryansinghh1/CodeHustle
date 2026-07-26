import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function HackathonCard({ hackathon }) {
  return (
    <div className="data-card flex flex-col justify-between" style={{ padding: 0, overflow: "hidden" }}>

      <div>
        <div style={{ height: 160, width: "100%", overflow: "hidden", background: "var(--slate-100)" }}>
          <img
            src={
              hackathon.bannerImage ||
              "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
            }
            alt={hackathon.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div style={{ padding: 20 }}>
          <h2 className="text-lg font-bold" style={{ color: "var(--slate-900)" }}>
            {hackathon.title}
          </h2>

          <p className="text-muted text-xs" style={{ marginTop: 6, lineHeight: 1.5 }}>
            {hackathon.description}
          </p>
        </div>
      </div>

      <div style={{ padding: "16px 20px", borderTop: "1px solid var(--slate-100)", marginTop: "auto" }}>
        <div className="flex items-center justify-between" style={{ fontSize: 13, marginBottom: 16 }}>
          <span className="badge badge-blue font-semibold">
            {hackathon.mode}
          </span>

          <span className="font-extrabold" style={{ color: "var(--slate-900)" }}>
            ₹ {hackathon.prizePool}
          </span>
        </div>

        <Link to={`/hackathons/${hackathon._id}`} className="primary-btn" style={{ width: "100%", padding: "10px", fontSize: 13 }}>
          View Details
          <FaArrowRight size={11} />
        </Link>
      </div>

    </div>
  );
}

export default HackathonCard;