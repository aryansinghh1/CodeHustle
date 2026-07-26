import { FaCode, FaHeart } from "react-icons/fa";

function Footer() {
  return (
    
    <footer className="footer-wrap">
      <div className="container flex flex-row justify-between items-center gap-4">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2">
          <div className="nav-logo-icon" style={{ width: 36, height: 36, fontSize: 16 }}>
            <FaCode />
          </div>
          <span className="text-lg font-extrabold" style={{ color: "var(--slate-900)" }}>
            CodeHustle
          </span>
        </div>

        {/* Right Side: Remaining Information */}
        <div className="text-right text-xs text-muted font-semibold flex flex-col items-end gap-1">
          <div>© 2026 CodeHustle. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Built with <FaHeart style={{ color: "var(--danger)" }} size={11} /> for hackathon builders across India.
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;