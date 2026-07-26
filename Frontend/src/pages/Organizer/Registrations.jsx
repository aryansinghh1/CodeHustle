import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCheck, FaTimes, FaTrophy } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { getHackathonRegistrations, approveRegistration, rejectRegistration } from "../../services/registrationService";

function Registrations() {
  const { id } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try { const res = await getHackathonRegistrations(id); setRegistrations(res.data.registrations); }
    catch (err) { toast.error("Unable to load registrations"); } finally { setLoading(false); }
  };

  useEffect(() => { fetchRegistrations(); }, []);

  const handleApprove = async (rid) => {
    try { await approveRegistration(rid); toast.success("Approved"); fetchRegistrations(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const handleReject = async (rid) => {
    try { await rejectRegistration(rid); toast.success("Rejected"); fetchRegistrations(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  if (loading) return <MainLayout><Loader text="Loading registrations..." /></MainLayout>;

  const statusBadge = (status) => {
    const map = { approved: "badge-green", pending: "badge-amber", rejected: "badge-red" };
    return map[status?.toLowerCase()] || "badge-slate";
  };

  return (
    <MainLayout>
      <div className="container section-spacing">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ marginBottom: 32 }}>
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1>Registrations</h1>
            <div className="accent-bar" />
            <p>Review and manage team registrations</p>
          </div>
          <Link to={`/leaderboard/${id}`} className="secondary-btn">
            <FaTrophy size={12} /> View Leaderboard
          </Link>
        </div>

        {registrations.length === 0 ? (
          <EmptyState title="No Registrations" subtitle="No teams have registered for this hackathon yet." />
        ) : (
          <div className="flex flex-col gap-3">
            {registrations.map((r) => (
              <div key={r._id} className="data-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--slate-900)" }}>{r.team.teamName}</h2>
                  <p className="text-xs text-muted" style={{ marginTop: 4 }}>
                    Hackathon: <span className="font-semibold" style={{ color: "var(--slate-800)" }}>{r.hackathon.title}</span>
                  </p>
                  <span className={`badge ${statusBadge(r.status)}`} style={{ marginTop: 8 }}>{r.status}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(r._id)} className="success-btn">
                    <FaCheck size={11} /> Approve
                  </button>
                  <button onClick={() => handleReject(r._id)} className="danger-btn">
                    <FaTimes size={11} /> Reject
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

export default Registrations;