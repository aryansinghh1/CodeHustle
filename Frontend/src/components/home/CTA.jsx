import { Link } from "react-router-dom";
import { FaRocket, FaArrowRight, FaCode } from "react-icons/fa6";

function CTA() {
  return (
    
    <section className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
      <div style={{ borderRadius: 32, background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #172554 100%)", padding: "48px 32px", color: "#fff", textAlign: "center", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          
          <div className="badge" style={{ background: "rgba(59,130,246,0.2)", color: "#93c5fd", border: "1px solid rgba(147,197,253,0.3)" }}>
            <FaCode size={12} /> Start Building Today
          </div>

          <h2 className="text-3xl font-extrabold" style={{ color: "#fff", fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            Ready To Launch Your Next Big Project?
          </h2>

          <p style={{ color: "var(--slate-300)", fontSize: 15, lineHeight: 1.6 }}>
            Join thousands of student developers and engineering leaders participating in hackathons, forming teams, and claiming prizes on CodeHustle.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3" style={{ marginTop: 8 }}>
            <Link to="/signup" className="primary-btn">
              <FaRocket /> Create Free Account <FaArrowRight size={12} />
            </Link>

            <Link to="/hackathons" className="outline-btn" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
              Explore Active Hackathons
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTA;
