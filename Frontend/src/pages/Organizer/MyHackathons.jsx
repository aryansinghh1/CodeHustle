import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaClipboardList, FaTrophy, FaFolderOpen } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { getMyHackathons, deleteHackathon } from "../../services/hackathonService";
import "./MyHackathons.css";

function MyHackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHackathons = async () => {
    try { const res = await getMyHackathons(); setHackathons(res.data.hackathons); }
    catch (err) { toast.error(err.response?.data?.message || "Failed to load"); } finally { setLoading(false); }
  };

  useEffect(() => { fetchHackathons(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hackathon?")) return;
    try { await deleteHackathon(id); toast.success("Hackathon Deleted"); fetchHackathons(); }
    catch (err) { toast.error(err.response?.data?.message || "Delete Failed"); }
  };

  if (loading) return <MainLayout><Loader text="Loading your hackathons..." /></MainLayout>;

  return (
    <MainLayout>
      <div className="container section-spacing">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 myhackathons-header-row">
          <div className="page-header myhackathons-page-header">
            <h1>My Hackathons</h1>
            <div className="accent-bar" />
          </div>
          <Link to="/organizer/create-hackathon" className="primary-btn">
            <FaPlus size={12} /> Create Hackathon
          </Link>
        </div>

        {hackathons.length === 0 ? (
          <EmptyState title="No Hackathons Created" subtitle="Create your first hackathon to get started." actionLabel="Create Hackathon" actionTo="/organizer/create-hackathon" />
        ) : (
          <div className="flex flex-col gap-4">
            {hackathons.map((h) => (
              <div key={h._id} className="data-card myhackathons-card flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="myhackathons-card-main flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl font-bold myhackathons-card-title">{h.title}</h2>
                    <span className="badge badge-blue">{h.mode}</span>
                    <span className="text-sm font-bold myhackathons-prize">₹ {h.prizePool}</span>
                  </div>
                  {h.theme && <p className="text-sm text-muted myhackathons-card-theme">{h.theme}</p>}
                </div>

                <div className="flex gap-2 flex-wrap items-center myhackathons-actions-row">
                  <Link to={`/organizer/submissions/${h._id}`} className="primary-btn myhackathons-btn-sm">
                    <FaFolderOpen size={11} /> Submissions & Reviews
                  </Link>
                  <Link to={`/leaderboard/${h._id}`} className="secondary-btn myhackathons-btn-sm">
                    <FaTrophy size={11} /> Leaderboard
                  </Link>
                  <Link to={`/organizer/registrations/${h._id}`} className="outline-btn myhackathons-btn-sm">
                    <FaClipboardList size={11} /> Registrations
                  </Link>
                  <Link to={`/organizer/edit-hackathon/${h._id}`} className="outline-btn myhackathons-btn-sm">
                    <FaEdit size={11} /> Edit
                  </Link>
                  <button onClick={() => handleDelete(h._id)} className="danger-btn myhackathons-btn-sm">
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

export default MyHackathons;