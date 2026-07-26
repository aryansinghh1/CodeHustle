import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import { createHackathon } from "../../services/hackathonService";

function CreateHackathon() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "", description: "", theme: "", mode: "Online", venue: "",
    startDate: "", endDate: "", registrationDeadline: "", bannerImage: "",
    prizePool: "", maxTeamSize: "", rules: "", judgingCriteria: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        maxTeamSize: Number(formData.maxTeamSize),
        rules: formData.rules.split(",").map((r) => r.trim()).filter(Boolean),
        judgingCriteria: formData.judgingCriteria.split(",").map((i) => i.trim()).filter(Boolean),
      };
      await createHackathon(payload);
      toast.success("Hackathon Created Successfully");
      navigate("/organizer/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create hackathon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container section-spacing" style={{ maxWidth: 880 }}>

        <div className="page-header">
          <h1>Create Hackathon</h1>
          <div className="accent-bar" />
          <p>Set up a new hackathon event for participants</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-grid">

            <div className="form-group">
              <label className="form-label">Title</label>
              <input name="title" placeholder="Hackathon name" onChange={handleChange} className="input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Theme</label>
              <input name="theme" placeholder="e.g. FinTech, HealthCare" onChange={handleChange} className="input" required />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <textarea name="description" placeholder="Describe your hackathon..." onChange={handleChange} className="input" rows={4} required />
            </div>

            <div className="form-group">
              <label className="form-label">Mode</label>
              <select name="mode" onChange={handleChange} className="input">
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Venue</label>
              <input name="venue" placeholder="Location or Online" onChange={handleChange} className="input" />
            </div>

            <div className="form-group">
              <label className="form-label">Registration Deadline</label>
              <input type="date" name="registrationDeadline" onChange={handleChange} className="input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input type="date" name="startDate" onChange={handleChange} className="input" required />
            </div>

            <div className="form-group">
              <label className="form-label">End Date</label>
              <input type="date" name="endDate" onChange={handleChange} className="input" required />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Banner Image URL</label>
              <input name="bannerImage" placeholder="https://..." onChange={handleChange} className="input" />
            </div>

            <div className="form-group">
              <label className="form-label">Prize Pool</label>
              <input name="prizePool" placeholder="₹50,000" onChange={handleChange} className="input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Max Team Size</label>
              <input type="number" name="maxTeamSize" placeholder="4" onChange={handleChange} className="input" required />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Rules (comma separated)</label>
              <textarea name="rules" placeholder="Rule 1, Rule 2, Rule 3" onChange={handleChange} className="input" rows={3} />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Judging Criteria (comma separated)</label>
              <textarea name="judgingCriteria" placeholder="Innovation, Technical Complexity, UI/UX" onChange={handleChange} className="input" rows={3} />
            </div>

            <div className="full-width">
              <button disabled={loading} className="primary-btn" style={{ width: "100%", marginTop: 12 }}>
                {loading ? "Creating..." : "Create Hackathon"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </MainLayout>
  );
}

export default CreateHackathon;