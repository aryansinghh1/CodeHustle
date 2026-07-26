import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaUsers, FaCrown } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import EmptyState from "../../components/common/EmptyState";
import { getHackathons } from "../../services/hackathonService";
import { createTeam, getMyTeams, deleteTeam } from "../../services/teamService";

function TeamPage() {
  const [teams, setTeams] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [hackathonId, setHackathonId] = useState("");
  const [teamSize, setTeamSize] = useState(1);

  const fetchTeams = async () => {
    try { const res = await getMyTeams(); setTeams(res.data.teams); } catch (err) { console.log(err); }
  };
  const fetchHackathons = async () => {
    try { const res = await getHackathons(); setHackathons(res.data.hackathons); } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchTeams(); fetchHackathons(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTeam({ teamName, hackathon: hackathonId, teamSize: Number(teamSize) });
      toast.success("Team Created");
      setTeamName(""); setHackathonId(""); setTeamSize(1);
      fetchTeams();
    } catch (err) { toast.error(err.response?.data?.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team?")) return;
    try { await deleteTeam(id); toast.success("Team Deleted"); fetchTeams(); }
    catch (err) { toast.error(err.response?.data?.message); }
  };

  return (
    <MainLayout>
      
      <div className="container section-spacing">
        <div className="page-header">
          <h1>My Teams</h1>
          <div className="accent-bar" />
          <p>Create and manage your hackathon teams</p>
        </div>

        {/* Create Team Form */}
        <div className="form-card" style={{ marginBottom: 32 }}>
          <h3 className="text-base font-bold" style={{ color: "var(--slate-900)", marginBottom: 16 }}>
            <FaPlus className="inline" style={{ marginRight: 6, color: "var(--primary)" }} size={13} />
            Create New Team
          </h3>
          <form onSubmit={handleCreate} className="grid grid-3 gap-4" style={{ alignItems: "end" }}>
            <div className="form-group">
              <label className="form-label">Team Name</label>
              <input type="text" placeholder="e.g. Code Warriors" value={teamName}
                onChange={(e) => setTeamName(e.target.value)} className="input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Hackathon</label>
              <select value={hackathonId} onChange={(e) => setHackathonId(e.target.value)} className="input" required>
                <option value="">Select Hackathon</option>
                {hackathons.map((h) => <option key={h._id} value={h._id}>{h.title}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Number of Members</label>
              <input type="number" min="1" placeholder="e.g. 4" value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)} className="input" required />
            </div>
            <div className="full-width">
              <button className="primary-btn">
                <FaPlus size={12} /> Create Team
              </button>
            </div>
          </form>
        </div>

        {/* Teams List */}
        {teams.length === 0 ? (
          <EmptyState title="No Teams Yet" subtitle="Create your first team above to get started." />
        ) : (
          <div className="grid grid-2 gap-4">
            {teams.map((team) => (
              <div key={team._id} className="data-card">
                <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--slate-900)" }}>
                  <FaUsers style={{ color: "var(--primary)" }} size={16} />
                  {team.teamName}
                </h2>

                <div className="flex flex-col gap-1" style={{ marginTop: 12 }}>
                  <p className="text-xs text-muted flex items-center gap-1">
                    <FaCrown style={{ color: "var(--warning)" }} size={11} />
                    Leader: <span className="font-bold" style={{ color: "var(--slate-800)" }}>{team.leader?.name}</span>
                  </p>
                  <p className="text-xs text-muted">
                    Hackathon: <span className="font-semibold" style={{ color: "var(--slate-800)" }}>{team.hackathon?.title}</span>
                  </p>
                  <p className="text-xs text-muted">
                    Members: <span className="badge badge-blue">{team.members?.length || 0} / {team.teamSize || 1}</span>
                  </p>
                </div>

                <button onClick={() => handleDelete(team._id)} className="danger-btn" style={{ marginTop: 16 }}>
                  <FaTrash size={11} /> Delete Team
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default TeamPage;
