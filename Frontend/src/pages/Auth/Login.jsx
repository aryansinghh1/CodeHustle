import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCode } from "react-icons/fa";

import { login as loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginUser(formData);
      const { user, token } = res.data;
      login(user, token);
      toast.success("Login Successful");

      switch (user.role) {
        case "admin": navigate("/admin/dashboard"); break;
        case "organizer": navigate("/organizer/dashboard"); break;
        case "judge": navigate("/judge/dashboard"); break;
        default: navigate("/participant/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="flex items-center justify-center gap-2" style={{ marginBottom: 24 }}>
          <div className="nav-logo-icon">
            <FaCode />
          </div>
          <span className="text-xl font-bold" style={{ color: "var(--slate-900)" }}>CodeHustle</span>
        </div>

        <h1 className="text-2xl font-bold text-center" style={{ color: "var(--slate-900)" }}>Welcome Back</h1>
        <p className="text-muted text-xs text-center" style={{ marginTop: 4, marginBottom: 24 }}>Sign in to continue building amazing projects</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="••••••••"
            />
          </div>

          <button disabled={loading} className="primary-btn" style={{ width: "100%", marginTop: 8 }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <p className="text-center text-xs text-muted" style={{ marginTop: 24 }}>
          Don't have an account?
          <Link to="/signup" className="font-bold" style={{ color: "var(--primary)", marginLeft: 6 }}>Create one</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;