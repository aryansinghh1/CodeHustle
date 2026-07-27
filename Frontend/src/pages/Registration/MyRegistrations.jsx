import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import EmptyState from "../../components/common/EmptyState";
import { getMyRegistrations, cancelRegistration } from "../../services/registrationService";
import "./MyRegistrations.css";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  const fetchRegistrations = async () => {
    try { const res = await getMyRegistrations(); setRegistrations(res.data.registrations); }
    catch (err) { console.log(err); }
  };

  useEffect(() => { fetchRegistrations(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel registration?")) return;
    try { await cancelRegistration(id); toast.success("Registration Cancelled"); fetchRegistrations(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const statusBadge = (status) => {
    const map = { approved: "badge-green", pending: "badge-amber", rejected: "badge-red" };
    return map[status?.toLowerCase()] || "badge-slate";
  };

  return (
    <MainLayout>
      <div className="container section-spacing">
        <div className="page-header">
          <h1>My Registrations</h1>
          <div className="accent-bar" />
        </div>

        {registrations.length === 0 ? (
          <EmptyState title="No Registrations" subtitle="Register for a hackathon to see it here." actionLabel="Browse Hackathons" actionTo="/hackathons" />
        ) : (
          <div className="flex flex-col gap-3">
            {registrations.map((r) => (
              <div key={r._id} className="data-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold myregs-title">{r.hackathon.title}</h2>
                  <p className="text-xs text-muted myregs-subtitle">
                    Team: <span className="font-semibold myregs-team-name">{r.team.teamName}</span>
                  </p>
                  <span className={`badge ${statusBadge(r.status)} myregs-status-badge`}>{r.status}</span>
                </div>
                <button onClick={() => handleCancel(r._id)} className="danger-btn">
                  <FaTimes size={11} /> Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </MainLayout>
  );
}

export default MyRegistrations;