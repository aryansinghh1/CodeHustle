import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import api from "../../services/axios";

function Profile() {
  const [user, setUser] = useState({
    name: "", email: "", college: "", bio: "",
    github: "", linkedin: "", skills: "", profileImage: "",
  });

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser({ ...res.data.user, skills: res.data.user.skills?.join(", ") || "" });
    } catch (err) { console.log(err); }
  };

  const handleChange = (e) => { setUser({ ...user, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/profile", { ...user, skills: user.skills.split(",").map((i) => i.trim()) });
      toast.success("Profile Updated");
    } catch (err) { toast.error("Update Failed"); }
  };

  return (
    <MainLayout>
      <div className="container section-spacing" style={{ maxWidth: 680 }}>
        <div className="page-header text-center">
          <h1>My Profile</h1>
          <div className="accent-bar" style={{ margin: "10px auto 0" }} />
          <p>Manage your personal information and links</p>
        </div>

        <div className="form-card">
          <div className="flex justify-center" style={{ marginBottom: 24 }}>
            <FaUserCircle size={64} style={{ color: "var(--primary)" }} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input name="name" value={user.name} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input value={user.email} disabled className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">College</label>
              <input name="college" value={user.college} onChange={handleChange} className="input" placeholder="Your college name" />
            </div>
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea name="bio" value={user.bio} onChange={handleChange} className="input" rows={4} placeholder="Tell us about yourself..." />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub</label>
              <input name="github" value={user.github} onChange={handleChange} className="input" placeholder="https://github.com/..." />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn</label>
              <input name="linkedin" value={user.linkedin} onChange={handleChange} className="input" placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="form-group">
              <label className="form-label">Skills (comma separated)</label>
              <input name="skills" value={user.skills} onChange={handleChange} className="input" placeholder="React, Node.js, MongoDB" />
            </div>
            <button className="primary-btn" style={{ width: "100%", marginTop: 8 }}>Save Changes</button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;