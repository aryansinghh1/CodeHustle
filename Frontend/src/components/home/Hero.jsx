import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaRocket, FaTrophy, FaUsers, FaCode, FaClock } from "react-icons/fa6";
import { getHackathons } from "../../services/hackathonService";

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
    
    <section className="container section-spacing" style={{ paddingTop: 36, paddingBottom: 48 }}>
      <div className="grid grid-2 items-center" style={{ gap: 40 }}>
        
        {/* Left Column */}
        <div className="flex flex-col" style={{ gap: 20 }}>
          
          {/* Badge Tag */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.9)", border: "1px solid var(--slate-200)", alignSelf: "flex-start" }}>
            <span className="badge badge-blue" style={{ padding: "3px 8px", fontSize: 11, fontWeight: 800 }}>LIVE</span>
            <span className="text-xs font-bold uppercase" style={{ letterSpacing: "0.08em", color: "var(--primary)" }}>
              India's Premier Hackathon Platform
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.15, color: "var(--slate-900)" }}>
            Where Great Ideas Become{" "}
            <span className="gradient-text">
              Real Innovations.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted text-lg" style={{ lineHeight: 1.6, maxWidth: 580 }}>
            Host high-impact hackathons, assemble elite dev teams, and submit groundbreaking projects with automated scoring and instant feedback.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3" style={{ paddingTop: 8 }}>
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
          <div className="grid grid-3 gap-3" style={{ marginTop: 12 }}>
            <div className="glass-card" style={{ padding: 14, borderRadius: 16 }}>
              <div className="flex items-center gap-2 font-bold text-sm" style={{ color: "var(--primary)" }}>
                <FaUsers size={14} />
                <span>Team Match</span>
              </div>
              <p className="text-xs text-muted" style={{ marginTop: 4 }}>Instant teambuilding</p>
            </div>

            <div className="glass-card" style={{ padding: 14, borderRadius: 16 }}>
              <div className="flex items-center gap-2 font-bold text-sm" style={{ color: "var(--purple)" }}>
                <FaTrophy size={14} />
                <span>Fair Judging</span>
              </div>
              <p className="text-xs text-muted" style={{ marginTop: 4 }}>Transparent rubrics</p>
            </div>

            <div className="glass-card" style={{ padding: 14, borderRadius: 16 }}>
              <div className="flex items-center gap-2 font-bold text-sm" style={{ color: "var(--success)" }}>
                <FaCode size={14} />
                <span>Live Status</span>
              </div>
              <p className="text-xs text-muted" style={{ marginTop: 4 }}>Real-time rankings</p>
            </div>
          </div>

        </div>

        {/* Right Column — Latest Created Hackathon Card */}
        <div className="flex justify-center">
          <div className="data-card" style={{ padding: 20, width: "100%", maxWidth: 440, borderRadius: 24, background: "rgba(255, 255, 255, 0.92)" }}>
            
            {/* Header Badge */}
            <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
              <span className={`badge ${latestHackathon?.status === "Ongoing" ? "badge-green" : latestHackathon?.status === "Completed" ? "badge-gray" : "badge-blue"}`}>
                ● {latestHackathon ? (latestHackathon.status || "Upcoming").toUpperCase() : "LATEST HACKATHON"}
              </span>
              <span className="text-xs text-muted font-semibold flex items-center gap-1">
                <FaClock size={11} /> {latestHackathon?.startDate ? new Date(latestHackathon.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Featured"}
              </span>
            </div>

            {/* Hackathon Preview Title & Image Banner */}
            <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "var(--slate-100)", minHeight: 160 }}>
              <img
                src={
                  latestHackathon?.bannerImage ||
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                }
                alt={latestHackathon?.title || "Hackathon Showcase"}
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.88), transparent)", padding: 14, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <span className="text-xs font-bold" style={{ color: "#93c5fd", textTransform: "uppercase" }}>
                  {latestHackathon?.theme || "Featured Challenge"}
                </span>
                <h3 className="text-sm font-bold" style={{ color: "#fff", marginTop: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {latestHackathon?.title || "Next-Gen Intelligent Agents"}
                </h3>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-3 text-center" style={{ gap: 8, padding: 10, background: "var(--slate-50)", borderRadius: 12, border: "1px solid var(--slate-200)", marginTop: 14 }}>
              <div>
                <p className="text-xs text-muted">Prize Pool</p>
                <p className="text-xs font-extrabold" style={{ color: "var(--primary)" }}>
                  {latestHackathon?.prizePool ? (String(latestHackathon.prizePool).startsWith("₹") || String(latestHackathon.prizePool).startsWith("$") ? latestHackathon.prizePool : `₹ ${latestHackathon.prizePool}`) : "₹ 2,50,000"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Mode</p>
                <p className="text-xs font-extrabold" style={{ color: "var(--slate-800)" }}>
                  {latestHackathon?.mode || "Online"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Max Team</p>
                <p className="text-xs font-extrabold" style={{ color: "var(--slate-800)" }}>
                  {latestHackathon?.maxTeamSize ? `${latestHackathon.maxTeamSize} Members` : "4 Members"}
                </p>
              </div>
            </div>

            {/* Description / Summary if available */}
            {latestHackathon?.description && (
              <p className="text-xs text-muted" style={{ marginTop: 12, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {latestHackathon.description}
              </p>
            )}

            <Link 
              to={latestHackathon ? `/hackathons/${latestHackathon._id}` : "/hackathons"} 
              className="secondary-btn" 
              style={{ width: "100%", marginTop: 14, padding: "10px", fontSize: 13 }}
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

