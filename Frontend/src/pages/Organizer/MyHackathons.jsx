import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaClipboardList } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { getMyHackathons, deleteHackathon } from "../../services/hackathonService";

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ marginBottom: 32 }}>
          <div className="page-header" style={{ marginBottom: 0 }}>
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
          <div className="grid grid-3 gap-4">
            {hackathons.map((h) => (
              <div key={h._id} className="data-card flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--slate-900)" }}>{h.title}</h2>
                  <p className="text-xs text-muted" style={{ marginTop: 4 }}>{h.theme}</p>
                  <div className="flex items-center gap-2" style={{ marginTop: 8 }}>
                    <span className="badge badge-blue">{h.mode}</span>
                    <span className="text-xs font-bold" style={{ color: "var(--slate-800)" }}>₹ {h.prizePool}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap" style={{ marginTop: 16 }}>
                  <Link to={`/organizer/edit-hackathon/${h._id}`} className="outline-btn" style={{ padding: "6px 12px", fontSize: 12 }}>
                    <FaEdit size={11} /> Edit
                  </Link>
                  <button onClick={() => handleDelete(h._id)} className="danger-btn" style={{ padding: "6px 12px", fontSize: 12 }}>
                    <FaTrash size={11} /> Delete
                  </button>
                  <Link to={`/organizer/registrations/${h._id}`} className="outline-btn" style={{ padding: "6px 12px", fontSize: 12 }}>
                    <FaClipboardList size={11} /> Registrations
                  </Link>
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