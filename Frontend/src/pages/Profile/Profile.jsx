import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  FaUserCircle,
  FaEdit,
  FaGraduationCap,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaCode,
  FaSave,
  FaTimes,
  FaUser,
  FaLink,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaImage,
  FaPen,
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import api from "../../services/axios";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { updateUser: updateAuthUser } = useAuth();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    bio: "",
    github: "",
    linkedin: "",
    skills: "",
    profileImage: "",
    role: "participant",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const nameInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/profile");
      const u = res.data.user;
      setUser(u);
      setFormData({
        name: u.name || "",
        email: u.email || "",
        college: u.college || "",
        bio: u.bio || "",
        github: u.github || "",
        linkedin: u.linkedin || "",
        skills: u.skills?.join(", ") || "",
        profileImage: u.profileImage || "",
        role: u.role || "participant",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile details");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (focusName = false) => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        college: user.college || "",
        bio: user.bio || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        skills: user.skills?.join(", ") || "",
        profileImage: user.profileImage || "",
        role: user.role || "participant",
      });
    }
    setIsEditing(true);

    if (focusName) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);
    try {
      const skillArray = formData.skills
        ? formData.skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        : [];

      const payload = {
        name: formData.name.trim(),
        college: formData.college,
        bio: formData.bio,
        github: formData.github,
        linkedin: formData.linkedin,
        skills: skillArray,
        profileImage: formData.profileImage,
      };

      const res = await api.put("/users/profile", payload);
      const updatedUser = res.data.user || { ...user, ...payload };
      setUser(updatedUser);

      // Sync with AuthContext to update Navbar & global app state
      if (updateAuthUser) {
        updateAuthUser(updatedUser);
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "profile-role-badge role-admin";
      case "organizer":
        return "profile-role-badge role-organizer";
      case "judge":
        return "profile-role-badge role-judge";
      default:
        return "profile-role-badge role-participant";
    }
  };

  const formatRoleName = (role) => {
    if (!role) return "Participant";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container section-spacing profile-container">
          <div className="loader-box">
            <div className="loader-spinner" />
            <p className="text-muted">Loading profile details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const skillList = user?.skills || [];

  return (
    <MainLayout>
      <div className="container section-spacing profile-container">
        {!isEditing ? (
          /* ================= VIEW MODE ================= */
          <div>
            {/* Hero Card */}
            <div className="profile-hero-card">
              <div className="profile-cover-banner">
                <div className="profile-cover-overlay" />
              </div>

              <div className="profile-header-content">
                <div className="flex items-end gap-6 flex-wrap">
                  <div className="profile-avatar-wrapper">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="profile-avatar-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="profile-avatar-placeholder"
                      style={{
                        display: user?.profileImage ? "none" : "flex",
                      }}
                    >
                      {user?.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle />}
                    </div>
                  </div>

                  <div className="profile-user-info">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="profile-user-name flex items-center gap-2">
                        {user?.name || "User Profile"}
                        <button
                          type="button"
                          onClick={() => handleEditClick(true)}
                          className="text-muted"
                          style={{
                            fontSize: "14px",
                            padding: "4px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                          title="Click to edit name"
                        >
                          <FaPen style={{ color: "var(--primary)" }} />
                        </button>
                      </h1>
                      <span className={getRoleBadgeClass(user?.role)}>
                        {formatRoleName(user?.role)}
                      </span>
                    </div>

                    <div className="profile-user-meta">
                      <span className="profile-meta-item">
                        <FaEnvelope style={{ color: "var(--primary)" }} />
                        {user?.email}
                        <FaCheckCircle style={{ color: "var(--success)", fontSize: "12px" }} title="Verified User" />
                      </span>

                      {user?.college && (
                        <span className="profile-meta-item">
                          <FaGraduationCap style={{ color: "var(--purple)" }} />
                          {user.college}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button onClick={() => handleEditClick(false)} className="primary-btn">
                  <FaEdit />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Profile Grid Cards */}
            <div className="grid grid-2">
              {/* About Me Section */}
              <div className="profile-section-card full-width">
                <h3 className="profile-section-title">
                  <FaUser style={{ color: "var(--primary)" }} />
                  About Me
                </h3>
                {user?.bio ? (
                  <p className="profile-bio-text">{user.bio}</p>
                ) : (
                  <p className="text-muted text-sm">
                    No bio added yet. Click <strong>"Edit Profile"</strong> to introduce yourself to the community.
                  </p>
                )}
              </div>

              {/* Skills Section */}
              <div className="profile-section-card">
                <h3 className="profile-section-title">
                  <FaCode style={{ color: "var(--purple)" }} />
                  Skills & Expertise
                </h3>
                {skillList.length > 0 ? (
                  <div className="skill-tags-wrapper">
                    {skillList.map((skill, index) => (
                      <span key={index} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-sm">
                    No skills listed yet. Add your programming languages and frameworks!
                  </p>
                )}
              </div>

              {/* Social Links Section */}
              <div className="profile-section-card">
                <h3 className="profile-section-title">
                  <FaLink style={{ color: "var(--success)" }} />
                  Social & Portfolio
                </h3>
                <div className="social-links-grid">
                  {user?.github ? (
                    <a
                      href={user.github.startsWith("http") ? user.github : `https://${user.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn social-btn-github"
                    >
                      <FaGithub size={18} />
                      GitHub Profile
                      <FaExternalLinkAlt size={10} style={{ opacity: 0.6 }} />
                    </a>
                  ) : (
                    <span className="social-btn" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                      <FaGithub size={18} />
                      No GitHub Added
                    </span>
                  )}

                  {user?.linkedin ? (
                    <a
                      href={user.linkedin.startsWith("http") ? user.linkedin : `https://${user.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn social-btn-linkedin"
                    >
                      <FaLinkedin size={18} />
                      LinkedIn Profile
                      <FaExternalLinkAlt size={10} style={{ opacity: 0.6 }} />
                    </a>
                  ) : (
                    <span className="social-btn" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                      <FaLinkedin size={18} />
                      No LinkedIn Added
                    </span>
                  )}
                </div>
              </div>

              {/* Account Details Section */}
              <div className="profile-section-card full-width">
                <h3 className="profile-section-title">
                  <FaShieldAlt style={{ color: "var(--warning)" }} />
                  Account Status
                </h3>
                <div className="flex items-center gap-6 flex-wrap">
                  <div>
                    <span className="text-xs text-muted">Role</span>
                    <p className="font-bold text-slate-800">{formatRoleName(user?.role)}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted">Account Status</span>
                    <p className="font-bold text-success flex items-center gap-1">
                      <FaCheckCircle size={12} /> Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= EDIT MODE ================= */
          <div className="form-card">
            <div className="edit-header-banner">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <FaEdit style={{ color: "var(--primary)" }} />
                  Edit Profile
                </h2>
                <p className="text-muted text-sm">Update your personal details, name, and social links</p>
              </div>

              <button type="button" onClick={handleCancelEdit} className="outline-btn">
                <FaTimes />
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Profile Image URL & Live Preview */}
              <div className="form-group full-width">
                <label className="form-label flex items-center gap-2">
                  <FaImage style={{ color: "var(--primary)" }} />
                  Profile Image URL
                </label>

                {formData.profileImage && (
                  <div className="avatar-preview-box">
                    <div className="profile-avatar-wrapper" style={{ width: 60, height: 60 }}>
                      <img
                        src={formData.profileImage}
                        alt="Preview"
                        className="profile-avatar-img"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-700">Image Preview</span>
                      <p className="text-xs text-muted">Ensure your URL points to a valid image file</p>
                    </div>
                  </div>
                )}

                <input
                  type="url"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://example.com/my-photo.jpg"
                />
              </div>

              <div className="form-grid">
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label flex items-center gap-1">
                    <FaUser style={{ color: "var(--primary)" }} />
                    Full Name *
                  </label>
                  <input
                    ref={nameInputRef}
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email (Disabled) */}
                <div className="form-group">
                  <label className="form-label">Email Address (Read-only)</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="input"
                  />
                </div>

                {/* College / Institution */}
                <div className="form-group full-width">
                  <label className="form-label">College / University / Organization</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g. Stanford University / MIT"
                  />
                </div>

                {/* Bio */}
                <div className="form-group full-width">
                  <label className="form-label">Bio Summary</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="input"
                    rows={4}
                    placeholder="Tell the community about your expertise, background, or hackathon goals..."
                  />
                </div>

                {/* Skills */}
                <div className="form-group full-width">
                  <label className="form-label">Skills (Comma Separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="input"
                    placeholder="React, Node.js, Python, MongoDB, Docker"
                  />
                  <span className="text-xs text-muted" style={{ marginTop: 2 }}>
                    Separate skills with commas (e.g. JavaScript, Tailwind, Express)
                  </span>
                </div>

                {/* GitHub */}
                <div className="form-group">
                  <label className="form-label flex items-center gap-1">
                    <FaGithub /> GitHub Link
                  </label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://github.com/yourname"
                  />
                </div>

                {/* LinkedIn */}
                <div className="form-group">
                  <label className="form-label flex items-center gap-1">
                    <FaLinkedin /> LinkedIn Link
                  </label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://linkedin.com/in/yourname"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 justify-end" style={{ marginTop: 12 }}>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="outline-btn"
                  disabled={saving}
                >
                  <FaTimes />
                  Cancel
                </button>

                <button type="submit" className="primary-btn" disabled={saving}>
                  {saving ? (
                    <>
                      <div className="loader-spinner" style={{ width: 16, height: 16 }} />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Profile;