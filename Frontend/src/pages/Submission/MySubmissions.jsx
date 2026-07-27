import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import EmptyState from "../../components/common/EmptyState";
import { getMySubmissions, deleteSubmission } from "../../services/submissionService";
import "./MySubmissions.css";

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mysubs-header-row">
          <div className="page-header mysubs-page-header">
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
                <h2 className="text-lg font-bold mysubs-project-title">{s.projectName}</h2>
                <div className="flex flex-col gap-1 mysubs-meta-group">
                  <p className="text-xs text-muted">Team: <span className="font-semibold mysubs-meta-val">{s.team.teamName}</span></p>
                  <p className="text-xs text-muted">Hackathon: <span className="font-semibold mysubs-meta-val">{s.hackathon.title}</span></p>
                  <span className="badge badge-blue mysubs-status-badge">{s.status}</span>
                </div>
                <div className="flex gap-2 mysubs-actions-row">
                  <Link to={`/submission/edit/${s._id}`} className="outline-btn mysubs-btn-sm">
                    <FaEdit size={11} /> Edit
                  </Link>
                  <button onClick={() => handleDelete(s._id)} className="danger-btn mysubs-btn-sm">
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