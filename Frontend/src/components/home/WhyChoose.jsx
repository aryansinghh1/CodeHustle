import { FaLaptopCode, FaUsers, FaTrophy, FaShieldHalved, FaChartLine, FaScaleBalanced } from "react-icons/fa6";
import "./WhyChoose.css";

const features = [
  { icon: <FaLaptopCode size={22} className="whychoose-icon-primary" />, title: "Build Amazing Projects", description: "Turn concepts into production-grade applications with real-time feedback and structured milestones." },
  { icon: <FaUsers size={22} className="whychoose-icon-purple" />, title: "Seamless Collaboration", description: "Assemble balanced teams, invite teammates with simple links, and manage roles seamlessly." },
  { icon: <FaTrophy size={22} className="whychoose-icon-warning" />, title: "Compete & Win Prizes", description: "Participate in nationwide prize pools, showcase project demos, and earn verified digital recognition." },
  { icon: <FaScaleBalanced size={22} className="whychoose-icon-success" />, title: "Transparent Rubrics", description: "Judges score with predefined multi-criteria rubrics for objective and fair project ranking." },
  { icon: <FaChartLine size={22} className="whychoose-icon-sky" />, title: "Live Leaderboards", description: "Watch scores compute automatically as judges review submissions, providing instant visibility." },
  { icon: <FaShieldHalved size={22} className="whychoose-icon-danger" />, title: "Role-Based Security", description: "Dedicated dashboards for participants, hackathon organizers, judges, and administrators." },
];

function WhyChoose() {
  return (
    <section className="container whychoose-section">
      <div className="text-center whychoose-header">
        <span className="badge badge-blue whychoose-badge">Platform Advantages</span>
        <h2 className="text-3xl font-extrabold whychoose-title">Why Choose CodeHustle?</h2>
        <p className="text-muted text-sm whychoose-subtitle">
          Built from the ground up for seamless hackathon management, hack-team formation, and transparent scoring.
        </p>
      </div>

      <div className="grid grid-3 gap-6">
        {features.map((item, index) => (
          <div key={index} className="data-card">
            <div className="whychoose-icon-wrapper">
              {item.icon}
            </div>

            <h3 className="text-lg font-bold whychoose-card-title">{item.title}</h3>
            <p className="text-muted text-xs whychoose-card-desc">{item.description}</p>
          </div>
        ))}
      </div>
      
    </section>
  );
}

export default WhyChoose;
