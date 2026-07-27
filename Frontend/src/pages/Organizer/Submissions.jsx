import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGithub, FaExternalLinkAlt, FaStar, FaUser, FaComments, FaCode, FaTrophy, FaArrowLeft } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { getHackathonSubmissions } from "../../services/submissionService";
import { getSubmissionReviews } from "../../services/reviewService";
import { getHackathonById } from "../../services/hackathonService";
import "./Submissions.css";

function Submissions() {
  const { hackathonId } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [reviewsMap, setReviewsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [hackathonId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [hRes, sRes] = await Promise.all([
        getHackathonById(hackathonId),
        getHackathonSubmissions(hackathonId),
      ]);

      setHackathon(hRes.data.hackathon);
      const subs = sRes.data.submissions || [];
      setSubmissions(subs);

      // Fetch reviews for all submissions
      const rMap = {};
      await Promise.all(
        subs.map(async (sub) => {
          try {
            const rRes = await getSubmissionReviews(sub._id);
            rMap[sub._id] = rRes.data.reviews || [];
          } catch (err) {
            rMap[sub._id] = [];
          }
        })
      );
      setReviewsMap(rMap);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader text="Loading submissions and judge reviews..." />
      </MainLayout>
    );
  }

  const criteriaList = [
    { label: "Innovation", key: "innovation" },
    { label: "Tech Complexity", key: "technicalComplexity" },
    { label: "UI / UX", key: "userInterface" },
    { label: "Functionality", key: "functionality" },
    { label: "Scalability", key: "scalability" },
    { label: "Documentation", key: "documentation" },
    { label: "Presentation", key: "presentation" },
  ];

  return (
    <MainLayout>
      <div className="container section-spacing">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 submissions-header-row">
          <div>
            <Link to="/organizer/my-hackathons" className="outline-btn submissions-back-btn">
              <FaArrowLeft size={11} /> Back to My Hackathons
            </Link>
            <h1 className="text-2xl font-extrabold submissions-title">
              Submissions & Judge Reviews
            </h1>
            <p className="text-sm text-muted submissions-subtitle">
              {hackathon?.title} • Total Submissions: {submissions.length}
            </p>
          </div>

          <Link to={`/leaderboard/${hackathonId}`} className="secondary-btn">
            <FaTrophy size={12} /> View Leaderboard
          </Link>
        </div>

        {submissions.length === 0 ? (
          <EmptyState
            title="No Submissions Yet"
            subtitle="Participants have not submitted any projects for this hackathon yet."
          />
        ) : (
          <div className="flex flex-col gap-6">
            {submissions.map((s) => {
              const reviews = reviewsMap[s._id] || [];
              const avgScore = reviews.length > 0
                ? (reviews.reduce((acc, r) => acc + (r.totalScore || 0), 0) / reviews.length).toFixed(1)
                : null;

              return (
                <div key={s._id} className="data-card submissions-card">
                  {/* Submission Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 submissions-card-header">
                    <div>
                      <span className="badge badge-blue submissions-badge-team">{s.team?.teamName || "Team"}</span>
                      <h2 className="text-xl font-bold submissions-project-name">{s.projectName}</h2>
                    </div>
                    {avgScore !== null ? (
                      <div className="flex items-center gap-2 submissions-avg-box">
                        <FaStar className="submissions-star-icon" />
                        <span className="text-sm font-bold submissions-avg-score">Avg Score: {avgScore} / 70</span>
                        <span className="text-xs text-muted">({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
                      </div>
                    ) : (
                      <span className="badge badge-amber">Pending Judge Reviews</span>
                    )}
                  </div>

                  {/* Submission Info */}
                  <div className="submissions-body">
                    {s.problemStatement && (
                      <div className="submissions-section-mb10">
                        <p className="text-xs font-bold text-muted uppercase">Problem Statement</p>
                        <p className="text-sm submissions-text-slate">{s.problemStatement}</p>
                      </div>
                    )}

                    {s.solution && (
                      <div className="submissions-section-mb12">
                        <p className="text-xs font-bold text-muted uppercase">Solution</p>
                        <p className="text-sm submissions-text-slate">{s.solution}</p>
                      </div>
                    )}

                    {s.techStack && s.techStack.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap submissions-tech-row">
                        <span className="text-xs font-bold text-muted uppercase"><FaCode className="inline" /> Tech Stack:</span>
                        {s.techStack.map((tech, idx) => (
                          <span key={idx} className="badge badge-blue">{tech}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-3 flex-wrap submissions-links-row">
                      {s.githubRepo && (
                        <a href={s.githubRepo} target="_blank" rel="noopener noreferrer" className="outline-btn submissions-btn-sm">
                          <FaGithub /> GitHub Repo
                        </a>
                      )}
                      {s.liveDemo && (
                        <a href={s.liveDemo} target="_blank" rel="noopener noreferrer" className="secondary-btn submissions-btn-sm">
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Judge Reviews Section */}
                  <div className="submissions-reviews-wrapper">
                    <h3 className="text-sm font-bold flex items-center gap-2 submissions-reviews-title">
                      <FaComments className="submissions-comments-icon" />
                      Judge Evaluations & Remarks ({reviews.length})
                    </h3>

                    {reviews.length === 0 ? (
                      <p className="text-xs text-muted font-semibold submissions-no-reviews">
                        No judge reviews submitted for this project yet.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {reviews.map((r) => (
                          <div key={r._id} className="submissions-review-card">
                            <div className="flex items-center justify-between submissions-review-top">
                              <div className="flex items-center gap-2">
                                <div className="submissions-judge-avatar">
                                  <FaUser />
                                </div>
                                <div>
                                  <p className="text-xs font-bold submissions-judge-name">{r.judge?.name || "Judge"}</p>
                                  <p className="text-xs text-muted">{r.judge?.email}</p>
                                </div>
                              </div>
                              <span className="badge badge-green font-bold">Total: {r.totalScore} / 70</span>
                            </div>

                            {/* Score Breakdown Grid */}
                            <div className="grid grid-4 gap-2 submissions-breakdown-grid">
                              {criteriaList.map((c) => (
                                <div key={c.key}>
                                  <p className="text-xs text-muted font-semibold">{c.label}</p>
                                  <p className="text-xs font-bold submissions-breakdown-val">{r[c.key]} / 10</p>
                                </div>
                              ))}
                            </div>

                            {/* Remarks / Feedback */}
                            {r.feedback && (
                              <div className="submissions-remarks-box">
                                <p className="text-xs font-bold text-muted uppercase">Judge Remarks & Feedback:</p>
                                <p className="text-xs text-slate-800 submissions-remarks-text">
                                  "{r.feedback}"
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default Submissions;
