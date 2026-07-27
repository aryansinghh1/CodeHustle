import { FaGoogle, FaMicrosoft, FaAmazon, FaGithub, FaCloud, FaGlobe } from "react-icons/fa6";
import "./TrustedBy.css";

function TrustedBy() {
  const partners = [
    { name: "Google Cloud", icon: <FaGoogle className="trustedby-google" /> },
    { name: "Microsoft", icon: <FaMicrosoft className="trustedby-microsoft" /> },
    { name: "AWS", icon: <FaAmazon className="trustedby-aws" /> },
    { name: "GitHub", icon: <FaGithub className="trustedby-github" /> },
    { name: "Cloudflare", icon: <FaCloud className="trustedby-cloudflare" /> },
    { name: "Open Source", icon: <FaGlobe className="trustedby-opensource" /> },
  ];

  return (
    <section className="container trustedby-section">
      <div className="data-card text-center trustedby-card">
        <p className="text-xs font-bold text-muted trustedby-subtitle">
          Powering Hackathons For Top Universities & Innovation Hubs
        </p>

        <div className="grid grid-6 gap-3 items-center">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center gap-2 trustedby-pill"
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