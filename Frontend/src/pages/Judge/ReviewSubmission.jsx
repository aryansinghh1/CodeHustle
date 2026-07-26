import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import { createReview } from "../../services/reviewService";

function ReviewSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    innovation: 0, technicalComplexity: 0, userInterface: 0,
    functionality: 0, scalability: 0, documentation: 0,
    presentation: 0, feedback: "",
  });

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
      <div className="container section-spacing" style={{ maxWidth: 680 }}>
        <div className="page-header">
          <h1>Evaluate Project</h1>
          <div className="accent-bar" />
          <p>Rate each criteria on a scale of 0-10</p>
        </div>

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