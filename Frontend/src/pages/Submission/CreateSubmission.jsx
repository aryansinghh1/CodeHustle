import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { getMyRegistrations } from "../../services/registrationService";
import { createSubmission } from "../../services/submissionService";
import "./CreateSubmission.css";

function CreateSubmission() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [approvedRegistrations, setApprovedRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const [formData, setFormData] = useState({
    team: "", hackathon: "", projectName: "", problemStatement: "",
    solution: "", description: "", githubRepo: "", liveDemo: "",
    techStack: "", screenshots: "", presentationPDF: "", demoVideo: "",
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const res = await getMyRegistrations();
      const allRegs = res.data.registrations || [];
      // Filter registrations with status "Approved" (or registered)
      const approved = allRegs.filter(
        (r) => r.status?.toLowerCase() === "approved"
      );
      setApprovedRegistrations(approved);

      if (approved.length === 1) {
        const reg = approved[0];
        const hId = typeof reg.hackathon === "object" ? reg.hackathon._id : reg.hackathon;
        const tId = typeof reg.team === "object" ? reg.team._id : reg.team;
        setSelectedRegistration(reg);
        setFormData((prev) => ({ ...prev, hackathon: hId, team: tId }));
      }
    } catch (err) {
      toast.error("Unable to load your hackathon registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleHackathonChange = (e) => {
    const hId = e.target.value;
    const reg = approvedRegistrations.find(
      (r) => (typeof r.hackathon === "object" ? r.hackathon._id : r.hackathon) === hId
    );

    if (reg) {
      const tId = typeof reg.team === "object" ? reg.team._id : reg.team;
      setSelectedRegistration(reg);
      setFormData((prev) => ({ ...prev, hackathon: hId, team: tId }));
    } else {
      setSelectedRegistration(null);
      setFormData((prev) => ({ ...prev, hackathon: "", team: "" }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSubmission({
        ...formData,
        techStack: formData.techStack ? formData.techStack.split(",").map((i) => i.trim()) : [],
        screenshots: formData.screenshots ? formData.screenshots.split(",").map((i) => i.trim()) : [],
      });
      toast.success("Project Submitted Successfully");
      navigate("/my-submissions");
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission Failed");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader text="Checking your hackathon registrations..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container section-spacing create-sub-container">
        <div className="page-header">
          <h1>Submit Project</h1>
          <div className="accent-bar" />
          <p>Share your project with the hackathon judges</p>
        </div>

        {approvedRegistrations.length === 0 ? (
          <EmptyState
            title="No Approved Hackathon Registrations"
            subtitle="You can only submit a project for a hackathon where your team registration has been approved by the organizer."
            actionLabel="Browse Hackathons"
            actionTo="/hackathons"
          />
        ) : (
          <div className="form-card">
            <form onSubmit={handleSubmit} className="form-grid">
              
              <div className="form-group">
                <label className="form-label">Participating Hackathon</label>
                <select
                  name="hackathon"
                  value={formData.hackathon}
                  onChange={handleHackathonChange}
                  className="input"
                  required
                >
                  <option value="">Select Participated Hackathon</option>
                  {approvedRegistrations.map((r) => {
                    const h = typeof r.hackathon === "object" ? r.hackathon : {};
                    return (
                      <option key={r._id} value={h._id}>
                        {h.title}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Registered Team</label>
                <input
                  type="text"
                  readOnly
                  value={
                    selectedRegistration
                      ? typeof selectedRegistration.team === "object"
                        ? selectedRegistration.team.teamName
                        : "Team Selected"
                      : "Select Hackathon First"
                  }
                  className="input text-muted create-sub-readonly-input"
                />
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
                <button className="primary-btn create-sub-submit-btn">Submit Project</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default CreateSubmission;