import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCode, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardRoute = () => {
    if (!user) return "/";
    switch (user.role) {
      case "admin": return "/admin/dashboard";
      case "organizer": return "/organizer/dashboard";
      case "judge": return "/judge/dashboard";
      default: return "/participant/dashboard";
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        
        {/* Brand Logo */}
        <Link to="/" className="nav-brand">
          <div className="nav-logo-icon">
            <FaCode />
          </div>
          <div>
            <div className="nav-logo-title">CodeHustle</div>
            <div className="nav-logo-subtitle">Hackathon Platform</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/hackathons" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
            Hackathons
          </NavLink>

          {user && (
            <>
              <NavLink to={dashboardRoute()} className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
                Dashboard
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
                Profile
              </NavLink>
            </>
          )}
        </nav>

        {/* User / Auth Actions */}
        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="outline-btn nav-login-btn">
                Login
              </Link>
              <Link to="/signup" className="secondary-btn nav-signup-btn">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <FaUserCircle size={22} className="nav-user-icon" />
                <span className="font-bold text-sm">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="secondary-btn nav-logout-btn">
                Logout
              </button>
            </>
          )}

          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mobile-dropdown">
          <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/hackathons" className="nav-link" onClick={() => setMenuOpen(false)}>
            Hackathons
          </NavLink>
          {user ? (
            <>
              <NavLink to={dashboardRoute()} className="nav-link" onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
                Profile
              </NavLink>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="danger-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/signup" className="nav-link" onClick={() => setMenuOpen(false)}>
                Signup
              </NavLink>
            </>
          )}
        </div>
      )}
      
    </header>
  );
}

export default Navbar;