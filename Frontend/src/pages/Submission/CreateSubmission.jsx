import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import { getMyTeams } from "../../services/teamService";
import { getHackathons } from "../../services/hackathonService";
import { createSubmission } from "../../services/submissionService";

function CreateSubmission() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [hackathons, setHackathons] = useState([]);

  const [formData, setFormData] = useState({
    team: "", hackathon: "", projectName: "", problemStatement: "",
    solution: "", description: "", githubRepo: "", liveDemo: "",
    techStack: "", screenshots: "", presentationPDF: "", demoVideo: "",
  });

  useEffect(() => { fetchTeams(); fetchHackathons(); }, []);

  const fetchTeams = async () => {
    try { const res = await getMyTeams(); setTeams(res.data.teams); } catch (err) { console.log(err); }
  };
  const fetchHackathons = async () => {
    try { const res = await getHackathons(); setHackathons(res.data.hackathons); } catch (err) { console.log(err); }
  };

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSubmission({
        ...formData,
        techStack: formData.techStack.split(",").map((i) => i.trim()),
        screenshots: formData.screenshots.split(",").map((i) => i.trim()),
      });
      toast.success("Project Submitted");
      navigate("/my-submissions");
    } catch (err) { toast.error(err.response?.data?.message || "Submission Failed"); }
  };

  return (
    <MainLayout>
      <div className="container section-spacing" style={{ maxWidth: 880 }}>
        <div className="page-header">
          <h1>Submit Project</h1>
          <div className="accent-bar" />
          <p>Share your project with the hackathon judges</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label className="form-label">Team</label>
              <select name="team" value={formData.team} onChange={handleChange} className="input" required>
                <option value="">Select Team</option>
                {teams.map((t) => <option key={t._id} value={t._id}>{t.teamName}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Hackathon</label>
              <select name="hackathon" value={formData.hackathon} onChange={handleChange} className="input" required>
                <option value="">Select Hackathon</option>
                {hackathons.map((h) => <option key={h._id} value={h._id}>{h.title}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input name="projectName" placeholder="My Project" className="input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub Repository</label>
              <input name="githubRepo" placeholder="https://github.com/..." className="input" onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Problem Statement</label>
              <textarea rows={3} name="problemStatement" placeholder="Problem statement..." className="input" onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Solution</label>
              <textarea rows={3} name="solution" placeholder="Solution..." className="input" onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Project Description</label>
              <textarea rows={4} name="description" placeholder="Description..." className="input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Live Demo URL</label>
              <input name="liveDemo" placeholder="https://..." className="input" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Demo Video URL</label>
              <input name="demoVideo" placeholder="https://..." className="input" onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Presentation PDF URL</label>
              <input name="presentationPDF" placeholder="https://..." className="input" onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Tech Stack (comma separated)</label>
              <input name="techStack" placeholder="React, Node.js, MongoDB..." className="input" onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Screenshot URLs (comma separated)</label>
              <input name="screenshots" placeholder="https://..., https://..." className="input" onChange={handleChange} />
            </div>
            <div className="full-width">
              <button className="primary-btn" style={{ width: "100%", marginTop: 12 }}>Submit Project</button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default CreateSubmission;