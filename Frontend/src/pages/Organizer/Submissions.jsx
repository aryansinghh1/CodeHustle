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
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ marginBottom: 28 }}>
          <div>
            <Link to="/organizer/my-hackathons" className="outline-btn" style={{ marginBottom: 16, padding: "6px 12px", fontSize: 12 }}>
              <FaArrowLeft size={11} /> Back to My Hackathons
            </Link>
            <h1 className="text-2xl font-extrabold" style={{ color: "var(--slate-900)" }}>
              Submissions & Judge Reviews
            </h1>
            <p className="text-sm text-muted" style={{ marginTop: 4 }}>
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
                <div key={s._id} className="data-card" style={{ padding: 24 }}>
                  {/* Submission Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2" style={{ paddingBottom: 16, borderBottom: "1px solid var(--slate-100)" }}>
                    <div>
                      <span className="badge badge-blue" style={{ marginBottom: 8 }}>{s.team?.teamName || "Team"}</span>
                      <h2 className="text-xl font-bold" style={{ color: "var(--slate-900)" }}>{s.projectName}</h2>
                    </div>
                    {avgScore !== null ? (
                      <div className="flex items-center gap-2" style={{ background: "rgba(37,99,235,0.08)", padding: "8px 16px", borderRadius: 12 }}>
                        <FaStar style={{ color: "var(--warning)" }} />
                        <span className="text-sm font-bold" style={{ color: "var(--slate-800)" }}>Avg Score: {avgScore} / 70</span>
                        <span className="text-xs text-muted">({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
                      </div>
                    ) : (
                      <span className="badge badge-amber">Pending Judge Reviews</span>
                    )}
                  </div>

                  {/* Submission Info */}
                  <div style={{ marginTop: 16 }}>
                    {s.problemStatement && (
                      <div style={{ marginBottom: 10 }}>
                        <p className="text-xs font-bold text-muted uppercase">Problem Statement</p>
                        <p className="text-sm" style={{ marginTop: 2, color: "var(--slate-800)" }}>{s.problemStatement}</p>
                      </div>
                    )}

                    {s.solution && (
                      <div style={{ marginBottom: 12 }}>
                        <p className="text-xs font-bold text-muted uppercase">Solution</p>
                        <p className="text-sm" style={{ marginTop: 2, color: "var(--slate-800)" }}>{s.solution}</p>
                      </div>
                    )}

                    {s.techStack && s.techStack.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 16 }}>
                        <span className="text-xs font-bold text-muted uppercase"><FaCode className="inline" /> Tech Stack:</span>
                        {s.techStack.map((tech, idx) => (
                          <span key={idx} className="badge badge-blue">{tech}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-3 flex-wrap" style={{ marginBottom: 20 }}>
                      {s.githubRepo && (
                        <a href={s.githubRepo} target="_blank" rel="noopener noreferrer" className="outline-btn" style={{ padding: "6px 12px", fontSize: 12 }}>
                          <FaGithub /> GitHub Repo
                        </a>
                      )}
                      {s.liveDemo && (
                        <a href={s.liveDemo} target="_blank" rel="noopener noreferrer" className="secondary-btn" style={{ padding: "6px 12px", fontSize: 12 }}>
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Judge Reviews Section */}
                  <div style={{ paddingTop: 16, borderTop: "1px dashed var(--slate-200)" }}>
                    <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--slate-900)", marginBottom: 14 }}>
                      <FaComments style={{ color: "var(--primary)" }} />
                      Judge Evaluations & Remarks ({reviews.length})
                    </h3>

                    {reviews.length === 0 ? (
                      <p className="text-xs text-muted font-semibold" style={{ background: "var(--slate-50)", padding: 12, borderRadius: 8 }}>
                        No judge reviews submitted for this project yet.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {reviews.map((r) => (
                          <div key={r._id} style={{ background: "rgba(248, 250, 252, 0.9)", border: "1px solid var(--slate-200)", borderRadius: 12, padding: 16 }}>
                            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                              <div className="flex items-center gap-2">
                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                                  <FaUser />
                                </div>
                                <div>
                                  <p className="text-xs font-bold" style={{ color: "var(--slate-900)" }}>{r.judge?.name || "Judge"}</p>
                                  <p className="text-xs text-muted">{r.judge?.email}</p>
                                </div>
                              </div>
                              <span className="badge badge-green font-bold">Total: {r.totalScore} / 70</span>
                            </div>

                            {/* Score Breakdown Grid */}
                            <div className="grid grid-4 gap-2" style={{ marginBottom: 12, background: "#fff", padding: 10, borderRadius: 8, border: "1px solid var(--slate-100)" }}>
                              {criteriaList.map((c) => (
                                <div key={c.key}>
                                  <p className="text-xs text-muted font-semibold">{c.label}</p>
                                  <p className="text-xs font-bold" style={{ color: "var(--slate-900)" }}>{r[c.key]} / 10</p>
                                </div>
                              ))}
                            </div>

                            {/* Remarks / Feedback */}
                            {r.feedback && (
                              <div style={{ marginTop: 8 }}>
                                <p className="text-xs font-bold text-muted uppercase">Judge Remarks & Feedback:</p>
                                <p className="text-xs text-slate-800" style={{ marginTop: 2, background: "#fff", padding: 8, borderRadius: 6, border: "1px solid var(--slate-200)", lineHeight: 1.5 }}>
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
