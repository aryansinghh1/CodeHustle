import { FaGoogle, FaMicrosoft, FaAmazon, FaGithub, FaCloud, FaGlobe } from "react-icons/fa6";

function TrustedBy() {
  const partners = [
    { name: "Google Cloud", icon: <FaGoogle style={{ color: "#ea4335" }} /> },
    { name: "Microsoft", icon: <FaMicrosoft style={{ color: "#00a4ef" }} /> },
    { name: "AWS", icon: <FaAmazon style={{ color: "#ff9900" }} /> },
    { name: "GitHub", icon: <FaGithub style={{ color: "#181717" }} /> },
    { name: "Cloudflare", icon: <FaCloud style={{ color: "#f38020" }} /> },
    { name: "Open Source", icon: <FaGlobe style={{ color: "#6366f1" }} /> },
  ];

  return (
    
    <section className="container" style={{ paddingTop: 20, paddingBottom: 20 }}>
      <div className="data-card text-center" style={{ padding: "20px 24px" }}>
        <p className="text-xs font-bold text-muted" style={{ textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>
          Powering Hackathons For Top Universities & Innovation Hubs
        </p>

        <div className="grid grid-6 gap-3 items-center">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center gap-2"
              style={{ padding: "10px 14px", borderRadius: 12, background: "#fff", border: "1px solid var(--slate-200)", fontSize: 13, fontWeight: 600, color: "var(--slate-700)" }}
            >
              <span>{p.icon}</span>
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;