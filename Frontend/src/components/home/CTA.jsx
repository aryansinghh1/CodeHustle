import { Link } from "react-router-dom";
import { FaRocket, FaArrowRight, FaCode } from "react-icons/fa6";
import "./CTA.css";

function CTA() {
  return (
    <section className="container cta-section">
      <div className="cta-banner-card">
        <div className="cta-content-wrapper">
          
          <div className="badge cta-badge">
            <FaCode size={12} /> Start Building Today
          </div>

          <h2 className="text-3xl font-extrabold cta-title">
            Ready To Launch Your Next Big Project?
          </h2>

          <p className="cta-desc">
            Join thousands of student developers and engineering leaders participating in hackathons, forming teams, and claiming prizes on CodeHustle.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 cta-btn-group">
            <Link to="/signup" className="primary-btn">
              <FaRocket /> Create Free Account <FaArrowRight size={12} />
            </Link>

            <Link to="/hackathons" className="outline-btn cta-outline-btn">
              Explore Active Hackathons
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTA;
