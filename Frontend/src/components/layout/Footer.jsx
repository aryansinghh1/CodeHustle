import { FaCode, FaHeart } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container flex flex-row justify-between items-center gap-4">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2">
          <div className="nav-logo-icon footer-logo-icon">
            <FaCode />
          </div>
          <span className="text-lg font-extrabold footer-brand-title">
            CodeHustle
          </span>
        </div>

        {/* Right Side: Remaining Information */}
        <div className="text-right text-xs text-muted font-semibold flex flex-col items-end gap-1">
          <div>© 2026 CodeHustle. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Built with <FaHeart className="footer-heart-icon" size={11} /> for hackathon builders across India.
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;