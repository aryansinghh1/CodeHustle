import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaClock, FaEdit, FaStar, FaListAlt } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { getJudgeSubmissions } from "../../services/submissionService";
import { getMyReviews } from "../../services/reviewService";
import "./Submissions.css";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [reviewsMap, setReviewsMap] = useState({});
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subRes, revRes] = await Promise.all([
        getJudgeSubmissions(),
        getMyReviews(),
      ]);

      const subs = subRes.data.submissions || [];
      setSubmissions(subs);

      const rMap = {};
      (revRes.data.reviews || []).forEach((rev) => {
        const subId = typeof rev.submission === "object" ? rev.submission?._id : rev.submission;
        if (subId) {
          rMap[subId] = rev;
        }
      });
      setReviewsMap(rMap);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader text="Loading your assigned projects..." />
      </MainLayout>
    );
  }

  const reviewedCount = submissions.filter((s) => reviewsMap[s._id]).length;
  const pendingCount = submissions.length - reviewedCount;

  const filteredSubmissions = submissions.filter((s) => {
    const isReviewed = Boolean(reviewsMap[s._id]);
    if (filter === "pending") return !isReviewed;
    if (filter === "reviewed") return isReviewed;
    return true;
  });

  return (
    <MainLayout>
      <div className="container section-spacing">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 judge-subs-header-row">
          <div className="page-header judge-subs-page-header">
            <h1>Assigned Projects</h1>
            <div className="accent-bar" />
            <p>Review and evaluate project submissions</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 p-1 judge-subs-filter-tabs">
            <button
              onClick={() => setFilter("all")}
              className={`${filter === "all" ? "primary-btn" : "outline-btn"} judge-subs-tab-btn`}
            >
              All ({submissions.length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`${filter === "pending" ? "primary-btn" : "outline-btn"} judge-subs-tab-btn`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter("reviewed")}
              className={`${filter === "reviewed" ? "primary-btn" : "outline-btn"} judge-subs-tab-btn`}
            >
              Reviewed ({reviewedCount})
            </button>
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <EmptyState
            title={
              filter === "pending"
                ? "No Pending Reviews"
                : filter === "reviewed"
                ? "No Reviewed Projects Yet"
                : "No Assigned Projects"
            }
            subtitle={
              filter === "pending"
                ? "Awesome! You have evaluated all assigned project submissions."
                : filter === "reviewed"
                ? "You haven't submitted reviews for any assigned projects yet."
                : "You don't have any projects to review yet."
            }
          />
        ) : (
          <div className="grid grid-3 gap-4">
            {filteredSubmissions.map((s) => {
              const review = reviewsMap[s._id];
              const isReviewed = Boolean(review);

              return (
                <div key={s._id} className="data-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 judge-subs-meta-row">
                      <span className="badge badge-blue">{s.hackathon?.title}</span>
                      {isReviewed ? (
                        <span className="badge badge-green flex items-center gap-1 font-bold">
                          <FaCheckCircle size={10} /> Score: {review.totalScore}/70
                        </span>
                      ) : (
                        <span className="badge badge-amber flex items-center gap-1 font-bold">
                          <FaClock size={10} /> Pending
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold judge-subs-project-title">
                      {s.projectName}
                    </h2>

                    <div className="flex flex-col gap-1 judge-subs-team-info">
                      <p className="text-xs text-muted">
                        Team: <span className="font-semibold judge-subs-team-name">{s.team?.teamName}</span>
                      </p>
                      {isReviewed && review.feedback && (
                        <p className="text-xs text-slate-800 judge-subs-feedback-preview">
                          "{review.feedback}"
                        </p>
                      )}
                    </div>
                  </div>

                  {isReviewed ? (
                    <Link to={`/judge/review/${s._id}`} className="outline-btn judge-subs-action-btn">
                      <FaEdit size={12} /> Edit Review
                    </Link>
                  ) : (
                    <Link to={`/judge/review/${s._id}`} className="primary-btn judge-subs-action-btn">
                      <FaStar size={12} /> Review Project
                    </Link>
                  )}
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