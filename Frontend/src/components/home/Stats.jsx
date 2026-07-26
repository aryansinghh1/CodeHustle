import { FaRocket, FaUsers, FaCode, FaGavel } from "react-icons/fa6";

function Stats() {
  const stats = [
    { number: "500+", label: "Hackathons Hosted", icon: <FaRocket style={{ color: "var(--primary)" }} />, subtext: "Across India & Remote" },
    { number: "20,000+", label: "Active Participants", icon: <FaUsers style={{ color: "var(--purple)" }} />, subtext: "Builders & Creators" },
    { number: "8,500+", label: "Projects Submitted", icon: <FaCode style={{ color: "var(--success)" }} />, subtext: "Production-ready solutions" },
    { number: "150+", label: "Expert Judges", icon: <FaGavel style={{ color: "var(--warning)" }} />, subtext: "Industry leaders & mentors" },
  ];

  return (
    
    <section className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="grid grid-4 gap-4">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--slate-50)", border: "1px solid var(--slate-200)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {item.icon}
                </div>
                <span className="badge badge-blue">Live Stats</span>
              </div>

              <h3 className="text-3xl font-extrabold" style={{ color: "var(--slate-900)" }}>{item.number}</h3>
              <p className="text-sm font-bold" style={{ color: "var(--slate-800)", marginTop: 6 }}>{item.label}</p>
            </div>

            <p className="text-xs text-muted font-semibold" style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--slate-100)" }}>
              {item.subtext}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
