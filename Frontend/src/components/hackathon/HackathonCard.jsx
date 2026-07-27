import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./HackathonCard.css";

function HackathonCard({ hackathon }) {
  return (
    <div className="data-card flex flex-col justify-between hackathon-card-wrapper">

      <div>
        
        <div className="hackathon-card-img-wrapper">
          <img
            src={
              hackathon.bannerImage ||
              "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
            }
            alt={hackathon.title}
            className="hackathon-card-img"
          />
        </div>

        <div className="hackathon-card-body">
          <h2 className="text-lg font-bold hackathon-card-title">
            {hackathon.title}
          </h2>

          <p className="text-muted text-xs hackathon-card-desc">
            {hackathon.description}
          </p>
        </div>
      </div>

      <div className="hackathon-card-footer">
        <div className="flex items-center justify-between hackathon-card-meta">
          <span className="badge badge-blue font-semibold">
            {hackathon.mode}
          </span>

          <span className="font-extrabold hackathon-card-prize">
            ₹ {hackathon.prizePool}
          </span>
        </div>

        <Link to={`/hackathons/${hackathon._id}`} className="primary-btn hackathon-card-btn">
          View Details
          <FaArrowRight size={11} />
        </Link>
      </div>

    </div>
  );
}

export default HackathonCard;