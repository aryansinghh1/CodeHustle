import { Link, useNavigate } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardRoute = () => {
    if (!user) return "/";

    switch (user.role) {
      case "admin":
        return "/admin/dashboard";

      case "organizer":
        return "/organizer/dashboard";

      case "judge":
        return "/judge/dashboard";

      default:
        return "/participant/dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#2b2b2b] text-white flex items-center justify-center">
            <FaCode />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              CodeHustle
            </h1>

            <p className="text-xs text-gray-500">
              Hackathon Platform
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex gap-8">

          <Link to="/">Home</Link>

          <Link to="/hackathons">
            Hackathons
          </Link>

          {user && (
            <>
              <Link to={dashboardRoute()}>
                Dashboard
              </Link>

              <Link to="/profile">
                Profile
              </Link>
            </>
          )}

        </nav>

        <div className="flex gap-3">

          {!user ? (
            <>
              <Link
                to="/login"
                className="border px-5 py-2 rounded-xl"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-[#2b2b2b] text-white px-5 py-2 rounded-xl"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;