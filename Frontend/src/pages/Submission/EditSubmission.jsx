import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getSubmissionById, updateSubmission } from "../../services/submissionService";

function EditSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    projectName: "", problemStatement: "", solution: "", description: "",
    githubRepo: "", liveDemo: "", techStack: "", screenshots: "",
    presentationPDF: "", demoVideo: "",
  });

  useEffect(() => { fetchSubmission(); }, []);

  const fetchSubmission = async () => {
    try {
      const res = await getSubmissionById(id);
      const s = res.data.submission;
      setFormData({
        projectName: s.projectName, problemStatement: s.problemStatement,
        solution: s.solution, description: s.description, githubRepo: s.githubRepo,
        liveDemo: s.liveDemo, techStack: s.techStack.join(", "),
        screenshots: s.screenshots.join(", "), presentationPDF: s.presentationPDF,
        demoVideo: s.demoVideo,
      });
    } catch (err) { toast.error("Unable to load submission"); } finally { setLoading(false); }
  };

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSubmission(id, {
        ...formData,
        techStack: formData.techStack.split(",").map((i) => i.trim()),
        screenshots: formData.screenshots.split(",").map((i) => i.trim()),
      });
      toast.success("Submission Updated");
      navigate("/my-submissions");
    } catch (err) { toast.error(err.response?.data?.message || "Update Failed"); }
  };

  if (loading) return <MainLayout><Loader text="Loading submission..." /></MainLayout>;

  return (
    <MainLayout>
      <div className="container section-spacing" style={{ maxWidth: 880 }}>
        <div className="page-header">
          <h1>Edit Submission</h1>
          <div className="accent-bar" />
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input name="projectName" value={formData.projectName} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub Repository</label>
              <input name="githubRepo" value={formData.githubRepo} onChange={handleChange} className="input" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Problem Statement</label>
              <textarea rows={3} name="problemStatement" value={formData.problemStatement} onChange={handleChange} className="input" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Solution</label>
              <textarea rows={3} name="solution" value={formData.solution} onChange={handleChange} className="input" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <textarea rows={4} name="description" value={formData.description} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">Live Demo URL</label>
              <input name="liveDemo" value={formData.liveDemo} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">Demo Video URL</label>
              <input name="demoVideo" value={formData.demoVideo} onChange={handleChange} className="input" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Presentation PDF URL</label>
              <input name="presentationPDF" value={formData.presentationPDF} onChange={handleChange} className="input" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Tech Stack (comma separated)</label>
              <input name="techStack" value={formData.techStack} onChange={handleChange} className="input" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Screenshot URLs (comma separated)</label>
              <input name="screenshots" value={formData.screenshots} onChange={handleChange} className="input" />
            </div>
            <div className="full-width">
              <button className="primary-btn" style={{ width: "100%", marginTop: 12 }}>Update Submission</button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditSubmission;