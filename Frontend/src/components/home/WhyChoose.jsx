import { FaLaptopCode, FaUsers, FaTrophy, FaShieldHalved, FaChartLine, FaScaleBalanced } from "react-icons/fa6";

const features = [
  { icon: <FaLaptopCode size={22} style={{ color: "var(--primary)" }} />, title: "Build Amazing Projects", description: "Turn concepts into production-grade applications with real-time feedback and structured milestones." },
  { icon: <FaUsers size={22} style={{ color: "var(--purple)" }} />, title: "Seamless Collaboration", description: "Assemble balanced teams, invite teammates with simple links, and manage roles seamlessly." },
  { icon: <FaTrophy size={22} style={{ color: "var(--warning)" }} />, title: "Compete & Win Prizes", description: "Participate in nationwide prize pools, showcase project demos, and earn verified digital recognition." },
  { icon: <FaScaleBalanced size={22} style={{ color: "var(--success)" }} />, title: "Transparent Rubrics", description: "Judges score with predefined multi-criteria rubrics for objective and fair project ranking." },
  { icon: <FaChartLine size={22} style={{ color: "#0284c7" }} />, title: "Live Leaderboards", description: "Watch scores compute automatically as judges review submissions, providing instant visibility." },
  { icon: <FaShieldHalved size={22} style={{ color: "var(--danger)" }} />, title: "Role-Based Security", description: "Dedicated dashboards for participants, hackathon organizers, judges, and administrators." },
];

function WhyChoose() {
  return (
    
    <section className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <div className="text-center" style={{ maxWidth: 600, margin: "0 auto 36px" }}>
        <span className="badge badge-blue" style={{ marginBottom: 8 }}>Platform Advantages</span>
        <h2 className="text-3xl font-extrabold" style={{ color: "var(--slate-900)" }}>Why Choose CodeHustle?</h2>
        <p className="text-muted text-sm" style={{ marginTop: 4 }}>
          Built from the ground up for seamless hackathon management, hack-team formation, and transparent scoring.
        </p>
      </div>

      <div className="grid grid-3 gap-6">
        {features.map((item, index) => (
          <div key={index} className="data-card">
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "var(--slate-50)", border: "1px solid var(--slate-200)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              {item.icon}
            </div>

            <h3 className="text-lg font-bold" style={{ color: "var(--slate-900)", marginBottom: 8 }}>{item.title}</h3>
            <p className="text-muted text-xs" style={{ lineHeight: 1.6 }}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;
