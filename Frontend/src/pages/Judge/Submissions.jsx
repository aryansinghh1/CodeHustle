import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import EmptyState from "../../components/common/EmptyState";
import { getJudgeSubmissions } from "../../services/submissionService";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => { fetchSubmissions(); }, []);

  const fetchSubmissions = async () => {
    try { const res = await getJudgeSubmissions(); setSubmissions(res.data.submissions); }
    catch (err) { console.log(err); }
  };

  return (
    <MainLayout>
      <div className="container section-spacing">
        <div className="page-header">
          <h1>Assigned Projects</h1>
          <div className="accent-bar" />
          <p>Review and evaluate project submissions</p>
        </div>

        {submissions.length === 0 ? (
          <EmptyState title="No Assigned Projects" subtitle="You don't have any projects to review yet." />
        ) : (
          <div className="grid grid-3 gap-4">
            {submissions.map((s) => (
              <div key={s._id} className="data-card flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--slate-900)" }}>{s.projectName}</h2>
                  <div className="flex flex-col gap-1" style={{ marginTop: 10 }}>
                    <p className="text-xs text-muted">Team: <span className="font-semibold" style={{ color: "var(--slate-800)" }}>{s.team.teamName}</span></p>
                    <p className="text-xs text-muted">Hackathon: <span className="font-semibold" style={{ color: "var(--slate-800)" }}>{s.hackathon.title}</span></p>
                  </div>
                </div>
                <Link to={`/judge/review/${s._id}`} className="primary-btn" style={{ width: "100%", marginTop: 16 }}>
                  <FaEye size={12} /> Review Project
                </Link>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </MainLayout>
  );
}

export default Submissions;