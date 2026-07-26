import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar, FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import { createReview } from "../../services/reviewService";
import { getSubmissionById } from "../../services/submissionService";

function ReviewSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [formData, setFormData] = useState({
    innovation: 0, technicalComplexity: 0, userInterface: 0,
    functionality: 0, scalability: 0, documentation: 0,
    presentation: 0, feedback: "",
  });

  useEffect(() => {
    if (id) fetchSubmission();
  }, [id]);

  const fetchSubmission = async () => {
    try {
      const res = await getSubmissionById(id);
      setSubmission(res.data.submission);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "feedback" ? e.target.value : Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({ submission: id, ...formData });
      toast.success("Review Submitted");
      navigate("/judge/submissions");
    } catch (err) { toast.error(err.response?.data?.message || "Review Failed"); }
  };

  const fields = [
    "innovation", "technicalComplexity", "userInterface",
    "functionality", "scalability", "documentation", "presentation",
  ];

  const formatLabel = (field) => {
    return field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  };

  return (
    <MainLayout>
      <div className="container section-spacing" style={{ maxWidth: 780 }}>
        <div className="page-header">
          <h1>Evaluate Project</h1>
          <div className="accent-bar" />
          <p>Rate each criteria on a scale of 0-10</p>
        </div>

        {/* Project Details Overview Card */}
        {submission && (
          <div className="data-card" style={{ marginBottom: 24 }}>
            <h2 className="text-xl font-extrabold" style={{ color: "var(--slate-900)" }}>
              {submission.projectName}
            </h2>
            
            <div className="flex flex-wrap gap-3 text-xs text-muted" style={{ marginTop: 8, marginBottom: 16 }}>
              <span>Team: <strong style={{ color: "var(--slate-800)" }}>{submission.team?.teamName}</strong></span>
              <span>•</span>
              <span>Hackathon: <strong style={{ color: "var(--slate-800)" }}>{submission.hackathon?.title}</strong></span>
            </div>

            {submission.problemStatement && (
              <div style={{ marginBottom: 12 }}>
                <p className="text-xs font-bold text-muted uppercase">Problem Statement</p>
                <p className="text-sm" style={{ marginTop: 2, color: "var(--slate-800)" }}>{submission.problemStatement}</p>
              </div>
            )}

            {submission.solution && (
              <div style={{ marginBottom: 12 }}>
                <p className="text-xs font-bold text-muted uppercase">Solution</p>
                <p className="text-sm" style={{ marginTop: 2, color: "var(--slate-800)" }}>{submission.solution}</p>
              </div>
            )}

            {submission.techStack && submission.techStack.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p className="text-xs font-bold text-muted uppercase" style={{ marginBottom: 6 }}>
                  <FaCode className="inline" style={{ marginRight: 4 }} /> Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {submission.techStack.map((tech, idx) => (
                    <span key={idx} className="badge badge-blue">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3" style={{ paddingTop: 8, borderTop: "1px solid var(--slate-100)" }}>
              {submission.githubRepo && (
                <a href={submission.githubRepo} target="_blank" rel="noopener noreferrer" className="outline-btn" style={{ padding: "6px 14px", fontSize: 13 }}>
                  <FaGithub /> GitHub Repo
                </a>
              )}
              {submission.liveDemo && (
                <a href={submission.liveDemo} target="_blank" rel="noopener noreferrer" className="secondary-btn" style={{ padding: "6px 14px", fontSize: 13 }}>
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>
          </div>
        )}

        <div className="form-card">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map((field) => (
              <div key={field} className="form-group">
                <label className="form-label flex items-center gap-2">
                  <FaStar style={{ color: "var(--warning)" }} size={12} />
                  {formatLabel(field)}
                </label>
                <input
                  type="number" min="0" max="10" name={field}
                  value={formData[field]} onChange={handleChange}
                  className="input"
                />
              </div>
            ))}

            <div className="form-group">
              <label className="form-label">Feedback</label>
              <textarea
                rows={5} name="feedback" placeholder="Share your detailed feedback..."
                value={formData.feedback} onChange={handleChange} className="input"
              />
            </div>

            <button className="primary-btn" style={{ width: "100%", marginTop: 8 }}>Submit Review</button>
          </form>
        </div>
      </div>
      
    </MainLayout>
  );
}

export default ReviewSubmission;