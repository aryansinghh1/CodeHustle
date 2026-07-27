import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaRocket, FaTrophy, FaUsers, FaCode, FaClock } from "react-icons/fa6";
import { getHackathons } from "../../services/hackathonService";
import "./Hero.css";

function Hero() {
  const [latestHackathon, setLatestHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestHackathon = async () => {
      try {
        setLoading(true);
        const res = await getHackathons({ limit: 1 });
        if (res.data?.hackathons && res.data.hackathons.length > 0) {
          setLatestHackathon(res.data.hackathons[0]);
        }
      } catch (error) {
        console.error("Failed to fetch latest hackathon for Hero:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestHackathon();
  }, []);

  return (
    <section className="container section-spacing hero-section">
      <div className="grid grid-2 items-center hero-grid">
        
        {/* Left Column */}
        <div className="flex flex-col hero-left-col">
          
          {/* Badge Tag */}
          <div className="hero-badge-tag">
            <span className="badge badge-blue hero-live-badge">LIVE</span>
            <span className="text-xs font-bold uppercase hero-tag-text">
              India's Premier Hackathon Platform
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl font-extrabold hero-title">
            Where Great Ideas Become{" "}
            <span className="gradient-text">
              Real Innovations.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted text-lg hero-subtitle">
            Host high-impact hackathons, assemble elite dev teams, and submit groundbreaking projects with automated scoring and instant feedback.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 hero-cta-group">
            <Link to="/hackathons" className="primary-btn">
              <FaRocket />
              Explore Hackathons
              <FaArrowRight size={12} />
            </Link>

            <Link to="/signup" className="outline-btn">
              Host a Hackathon
            </Link>
          </div>

          {/* Quick Highlights Pills */}
          <div className="grid grid-3 gap-3 hero-highlights-grid">
            <div className="glass-card hero-glass-card">
              <div className="flex items-center gap-2 font-bold text-sm hero-card-header-primary">
                <FaUsers size={14} />
                <span>Team Match</span>
              </div>
              <p className="text-xs text-muted hero-card-subtext">Instant teambuilding</p>
            </div>

            <div className="glass-card hero-glass-card">
              <div className="flex items-center gap-2 font-bold text-sm hero-card-header-purple">
                <FaTrophy size={14} />
                <span>Fair Judging</span>
              </div>
              <p className="text-xs text-muted hero-card-subtext">Transparent rubrics</p>
            </div>

            <div className="glass-card hero-glass-card">
              <div className="flex items-center gap-2 font-bold text-sm hero-card-header-success">
                <FaCode size={14} />
                <span>Live Status</span>
              </div>
              <p className="text-xs text-muted hero-card-subtext">Real-time rankings</p>
            </div>
          </div>

        </div>

        {/* Right Column — Latest Created Hackathon Card */}
        <div className="flex justify-center">
          <div className="data-card hero-card-wrapper">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between hero-card-top">
              <span className={`badge ${latestHackathon?.status === "Ongoing" ? "badge-green" : latestHackathon?.status === "Completed" ? "badge-gray" : "badge-blue"}`}>
                ● {latestHackathon ? (latestHackathon.status || "Upcoming").toUpperCase() : "LATEST HACKATHON"}
              </span>
              <span className="text-xs text-muted font-semibold flex items-center gap-1">
                <FaClock size={11} /> {latestHackathon?.startDate ? new Date(latestHackathon.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Featured"}
              </span>
            </div>

            {/* Hackathon Preview Title & Image Banner */}
            <div className="hero-card-banner">
              <img
                src={
                  latestHackathon?.bannerImage ||
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                }
                alt={latestHackathon?.title || "Hackathon Showcase"}
                className="hero-banner-img"
              />
              <div className="hero-banner-overlay">
                <span className="text-xs font-bold hero-banner-tag">
                  {latestHackathon?.theme || "Featured Challenge"}
                </span>
                <h3 className="text-sm font-bold hero-banner-title">
                  {latestHackathon?.title || "Next-Gen Intelligent Agents"}
                </h3>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-3 text-center hero-stats-bar">
              <div>
                <p className="text-xs text-muted">Prize Pool</p>
                <p className="text-xs font-extrabold hero-stat-primary">
                  {latestHackathon?.prizePool ? (String(latestHackathon.prizePool).startsWith("₹") || String(latestHackathon.prizePool).startsWith("$") ? latestHackathon.prizePool : `₹ ${latestHackathon.prizePool}`) : "₹ 2,50,000"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Mode</p>
                <p className="text-xs font-extrabold hero-stat-dark">
                  {latestHackathon?.mode || "Online"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Max Team</p>
                <p className="text-xs font-extrabold hero-stat-dark">
                  {latestHackathon?.maxTeamSize ? `${latestHackathon.maxTeamSize} Members` : "4 Members"}
                </p>
              </div>
            </div>

            {/* Description / Summary if available */}
            {latestHackathon?.description && (
              <p className="text-xs text-muted hero-card-desc">
                {latestHackathon.description}
              </p>
            )}

            <Link 
              to={latestHackathon ? `/hackathons/${latestHackathon._id}` : "/hackathons"} 
              className="secondary-btn hero-details-btn"
            >
              {latestHackathon ? "View Hackathon Details" : "Explore All Hackathons"}
              <FaArrowRight size={11} />
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;

