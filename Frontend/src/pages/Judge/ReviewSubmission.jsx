import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar, FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { createReview, getMyReviews } from "../../services/reviewService";
import { getSubmissionById } from "../../services/submissionService";
import "./ReviewSubmission.css";

function ReviewSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    innovation: 0, technicalComplexity: 0, userInterface: 0,
    functionality: 0, scalability: 0, documentation: 0,
    presentation: 0, feedback: "",
  });

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subRes, revRes] = await Promise.allSettled([
        getSubmissionById(id),
        getMyReviews(),
      ]);

      if (subRes.status === "fulfilled") {
        setSubmission(subRes.value.data.submission);
      }

      if (revRes.status === "fulfilled" && revRes.value.data.reviews) {
        const existingReview = revRes.value.data.reviews.find(
          (r) => r.submission === id || r.submission?._id === id
        );
        if (existingReview) {
          setFormData({
            innovation: existingReview.innovation || 0,
            technicalComplexity: existingReview.technicalComplexity || 0,
            userInterface: existingReview.userInterface || 0,
            functionality: existingReview.functionality || 0,
            scalability: existingReview.scalability || 0,
            documentation: existingReview.documentation || 0,
            presentation: existingReview.presentation || 0,
            feedback: existingReview.feedback || "",
          });
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val =
      e.target.name === "feedback"
        ? e.target.value
        : Math.min(10, Math.max(0, Number(e.target.value) || 0));

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await createReview({ submission: id, ...formData });
      toast.success("Review Submitted Successfully");
      navigate("/judge/submissions");
    } catch (err) {
      toast.error(err.response?.data?.message || "Review Submission Failed");
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    "innovation", "technicalComplexity", "userInterface",
    "functionality", "scalability", "documentation", "presentation",
  ];

  const formatLabel = (field) => {
    return field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader text="Loading evaluation details..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container section-spacing review-sub-container">
        <div className="page-header">
          <h1>Evaluate Project</h1>
          <div className="accent-bar" />
          <p>Rate each criteria on a scale of 0-10</p>
        </div>

        {/* Project Details Overview Card */}
        {submission && (
          <div className="data-card review-sub-card">
            <h2 className="text-xl font-extrabold review-sub-title">
              {submission.projectName}
            </h2>
            
            <div className="flex flex-wrap gap-3 text-xs text-muted review-sub-meta">
              <span>Team: <strong className="review-sub-meta-val">{submission.team?.teamName}</strong></span>
              <span>•</span>
              <span>Hackathon: <strong className="review-sub-meta-val">{submission.hackathon?.title}</strong></span>
            </div>

            {submission.problemStatement && (
              <div className="review-sub-section-mb12">
                <p className="text-xs font-bold text-muted uppercase">Problem Statement</p>
                <p className="text-sm review-sub-meta-val">{submission.problemStatement}</p>
              </div>
            )}

            {submission.solution && (
              <div className="review-sub-section-mb12">
                <p className="text-xs font-bold text-muted uppercase">Solution</p>
                <p className="text-sm review-sub-meta-val">{submission.solution}</p>
              </div>
            )}

            {submission.techStack && submission.techStack.length > 0 && (
              <div className="review-sub-section-mb16">
                <p className="text-xs font-bold text-muted uppercase review-sub-tech-label">
                  <FaCode className="inline review-sub-icon-margin" /> Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {submission.techStack.map((tech, idx) => (
                    <span key={idx} className="badge badge-blue">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 review-sub-links-row">
              {submission.githubRepo && (
                <a href={submission.githubRepo} target="_blank" rel="noopener noreferrer" className="outline-btn review-sub-link-btn">
                  <FaGithub /> GitHub Repo
                </a>
              )}
              {submission.liveDemo && (
                <a href={submission.liveDemo} target="_blank" rel="noopener noreferrer" className="secondary-btn review-sub-link-btn">
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
                  <FaStar className="review-sub-star-icon" size={12} />
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

            <button disabled={submitting} className="primary-btn review-sub-submit-btn">
              {submitting ? "Submitting Review..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
      
    </MainLayout>
  );
}

export default ReviewSubmission;