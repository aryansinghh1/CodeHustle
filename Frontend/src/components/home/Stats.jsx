import { FaRocket, FaUsers, FaCode, FaGavel } from "react-icons/fa6";
import "./Stats.css";

function Stats() {
  const stats = [
    { number: "500+", label: "Hackathons Hosted", icon: <FaRocket className="stats-icon-primary" />, subtext: "Across India & Remote" },
    { number: "20,000+", label: "Active Participants", icon: <FaUsers className="stats-icon-purple" />, subtext: "Builders & Creators" },
    { number: "8,500+", label: "Projects Submitted", icon: <FaCode className="stats-icon-success" />, subtext: "Production-ready solutions" },
    { number: "150+", label: "Expert Judges", icon: <FaGavel className="stats-icon-warning" />, subtext: "Industry leaders & mentors" },
  ];

  return (
    <section className="container stats-section">
      <div className="grid grid-4 gap-4">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <div>
              <div className="flex items-center justify-between stat-header">
                <div className="stat-icon-wrapper">
                  {item.icon}
                </div>
                <span className="badge badge-blue">Live Stats</span>
              </div>

              <h3 className="text-3xl font-extrabold stat-number">{item.number}</h3>
              <p className="text-sm font-bold stat-label">{item.label}</p>
            </div>

            <p className="text-xs text-muted font-semibold stat-subtext">
              {item.subtext}
            </p>
          </div>
        ))}
      </div>
      
    </section>
  );
}

export default Stats;
