import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCode } from "react-icons/fa";

import { signup } from "../../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signup(formData);
      toast.success("Account Created Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed");
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

        <h1 className="text-2xl font-bold text-center" style={{ color: "var(--slate-900)" }}>Create Account</h1>
        <p className="text-muted text-xs text-center" style={{ marginTop: 4, marginBottom: 24 }}>Join thousands of developers competing in hackathons</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="John Doe"
            />
          </div>

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
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-xs text-muted" style={{ marginTop: 24 }}>
          Already have an account?
          <Link to="/login" className="font-bold" style={{ color: "var(--primary)", marginLeft: 6 }}>Sign in</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;