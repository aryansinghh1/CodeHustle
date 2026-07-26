import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import EmptyState from "../../components/common/EmptyState";
import { getMySubmissions, deleteSubmission } from "../../services/submissionService";

function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    try { const res = await getMySubmissions(); setSubmissions(res.data.submissions); }
    catch (err) { console.log(err); }
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this submission?")) return;
    try { await deleteSubmission(id); toast.success("Submission Deleted"); fetchSubmissions(); }
    catch (err) { toast.error(err.response?.data?.message || "Delete Failed"); }
  };

  return (
    <MainLayout>
      <div className="container section-spacing">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ marginBottom: 32 }}>
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1>My Submissions</h1>
            <div className="accent-bar" />
          </div>
          <Link to="/submission/create" className="primary-btn">
            <FaPlus size={12} /> Submit Project
          </Link>
        </div>

        {submissions.length === 0 ? (
          <EmptyState title="No Submissions Yet" subtitle="Submit your first project to see it here." actionLabel="Submit Project" actionTo="/submission/create" />
        ) : (
          <div className="grid grid-3 gap-4">
            {submissions.map((s) => (
              <div key={s._id} className="data-card">
                <h2 className="text-lg font-bold" style={{ color: "var(--slate-900)" }}>{s.projectName}</h2>
                <div className="flex flex-col gap-1" style={{ marginTop: 10 }}>
                  <p className="text-xs text-muted">Team: <span className="font-semibold" style={{ color: "var(--slate-800)" }}>{s.team.teamName}</span></p>
                  <p className="text-xs text-muted">Hackathon: <span className="font-semibold" style={{ color: "var(--slate-800)" }}>{s.hackathon.title}</span></p>
                  <span className="badge badge-blue" style={{ marginTop: 4, alignSelf: "flex-start" }}>{s.status}</span>
                </div>
                <div className="flex gap-2" style={{ marginTop: 16 }}>
                  <Link to={`/submission/edit/${s._id}`} className="outline-btn" style={{ padding: "6px 12px", fontSize: 12 }}>
                    <FaEdit size={11} /> Edit
                  </Link>
                  <button onClick={() => handleDelete(s._id)} className="danger-btn" style={{ padding: "6px 12px", fontSize: 12 }}>
                    <FaTrash size={11} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default MySubmissions;