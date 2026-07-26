import { Link } from "react-router-dom";
import { FaArrowRight, FaRocket, FaTrophy, FaUsers, FaCode, FaClock } from "react-icons/fa6";

function Hero() {
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

        {/* Right Column — Simulated Live Interactive Card */}
        <div className="flex justify-center">
          <div className="data-card" style={{ padding: 20, width: "100%", maxWidth: 440, borderRadius: 24, background: "rgba(255, 255, 255, 0.92)" }}>
            
            {/* Header Badge */}
            <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
              <span className="badge badge-green">
                ● LIVE NOW
              </span>
              <span className="text-xs text-muted font-semibold flex items-center gap-1">
                <FaClock size={11} /> Ends in 18h 42m
              </span>
            </div>

            {/* Hackathon Preview Title & Image Banner */}
            <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Hackathon Showcase"
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.85), transparent)", padding: 14, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <span className="text-xs font-bold" style={{ color: "#93c5fd", textTransform: "uppercase" }}>Global AI Challenge 2026</span>
                <h3 className="text-sm font-bold" style={{ color: "#fff", marginTop: 2 }}>Next-Gen Intelligent Agents</h3>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-3 text-center" style={{ gap: 8, padding: 10, background: "var(--slate-50)", borderRadius: 12, border: "1px solid var(--slate-200)", marginTop: 14 }}>
              <div>
                <p className="text-xs text-muted">Prize Pool</p>
                <p className="text-xs font-extrabold" style={{ color: "var(--primary)" }}>₹ 2,50,000</p>
              </div>
              <div>
                <p className="text-xs text-muted">Teams</p>
                <p className="text-xs font-extrabold" style={{ color: "var(--slate-800)" }}>142 Active</p>
              </div>
              <div>
                <p className="text-xs text-muted">Submissions</p>
                <p className="text-xs font-extrabold" style={{ color: "var(--slate-800)" }}>89 Done</p>
              </div>
            </div>

            {/* Leaderboard Pill */}
            <div className="flex items-center justify-between" style={{ padding: 10, background: "rgba(37,99,235,0.06)", borderRadius: 12, border: "1px solid rgba(37,99,235,0.15)", marginTop: 12 }}>
              <div className="flex items-center gap-2">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11 }}>
                  #1
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--slate-900)" }}>Team CyberSamurai</p>
                  <p className="text-xs text-muted">Score 96.5</p>
                </div>
              </div>
              <span className="badge badge-blue">Top Rank</span>
            </div>

            {/* Prize Distributed Badge */}
            <div className="flex items-center gap-3" style={{ padding: 10, background: "var(--success-light)", borderRadius: 12, border: "1px solid rgba(16,185,129,0.2)", marginTop: 12 }}>
              <FaTrophy style={{ color: "var(--success)", fontSize: 18 }} />
              <div>
                <p className="text-xs font-bold" style={{ color: "var(--slate-900)" }}>₹ 10,00,000+ Awarded</p>
                <p className="text-xs text-muted">Total prize money distributed</p>
              </div>
            </div>

            {/* Action Link */}
            <Link to="/hackathons" className="secondary-btn" style={{ width: "100%", marginTop: 14, padding: "10px", fontSize: 13 }}>
              Join This Hackathon
              <FaArrowRight size={11} />
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
