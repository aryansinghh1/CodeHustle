import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaUsers, FaCrown, FaUserPlus } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import EmptyState from "../../components/common/EmptyState";
import { getHackathons } from "../../services/hackathonService";
import { createTeam, getMyTeams, deleteTeam } from "../../services/teamService";
import "./TeamPage.css";

function TeamPage() {
  const [teams, setTeams] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [hackathonId, setHackathonId] = useState("");
  const [teamSize, setTeamSize] = useState(1);
  const [memberNames, setMemberNames] = useState([]);

  const selectedHackathon = hackathons.find((h) => h._id === hackathonId);
  const maxLimit = selectedHackathon?.maxTeamSize || 10;

  const fetchTeams = async () => {
    try { const res = await getMyTeams(); setTeams(res.data.teams); } catch (err) { console.log(err); }
  };
  const fetchHackathons = async () => {
    try { const res = await getHackathons(); setHackathons(res.data.hackathons); } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchTeams(); fetchHackathons(); }, []);

  const handleHackathonChange = (id) => {
    setHackathonId(id);
    const h = hackathons.find((item) => item._id === id);
    if (h && teamSize > h.maxTeamSize) {
      handleTeamSizeChange(h.maxTeamSize, h.maxTeamSize);
    }
  };

  const handleTeamSizeChange = (val, max = maxLimit) => {
    let size = Number(val) || 1;
    if (size > max) {
      toast.error(`Maximum allowed team members for this hackathon is ${max}`);
      size = max;
    }
    if (size < 1) size = 1;

    setTeamSize(size);

    const needed = size - 1;
    setMemberNames((prev) => {
      const updated = [...prev];
      if (updated.length < needed) {
        while (updated.length < needed) updated.push("");
      } else {
        updated.length = needed;
      }
      return updated;
    });
  };

  const handleMemberNameChange = (index, value) => {
    const updated = [...memberNames];
    updated[index] = value;
    setMemberNames(updated);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const filteredNames = memberNames.map((n) => n.trim()).filter(Boolean);
      await createTeam({
        teamName,
        hackathon: hackathonId,
        teamSize: Number(teamSize),
        memberNames: filteredNames,
      });
      toast.success("Team Created Successfully");
      setTeamName(""); setHackathonId(""); setTeamSize(1); setMemberNames([]);
      fetchTeams();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to create team"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team?")) return;
    try { await deleteTeam(id); toast.success("Team Deleted"); fetchTeams(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed to delete team"); }
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
        <div className="form-card team-form-card">
          <h3 className="text-base font-bold team-form-header">
            <FaPlus className="inline team-form-header-icon" size={13} />
            Create New Team
          </h3>
          
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div className="grid grid-3 gap-4 team-form-grid-top">
              <div className="form-group">
                <label className="form-label">Team Name</label>
                <input
                  type="text"
                  placeholder="e.g. Code Warriors"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hackathon</label>
                <select
                  value={hackathonId}
                  onChange={(e) => handleHackathonChange(e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select Hackathon</option>
                  {hackathons.map((h) => (
                    <option key={h._id} value={h._id}>
                      {h.title} (Max Team: {h.maxTeamSize})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Number of Members {selectedHackathon ? `(Max ${selectedHackathon.maxTeamSize})` : ""}
                </label>
                <input
                  type="number"
                  min="1"
                  max={maxLimit}
                  placeholder={`1 to ${maxLimit}`}
                  value={teamSize}
                  onChange={(e) => handleTeamSizeChange(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

            {/* Dynamic Member Name Input Boxes */}
            {teamSize > 1 && (
              <div className="team-members-box">
                <p className="text-xs font-bold uppercase text-muted team-members-title">
                  <FaUserPlus className="inline team-icon-primary-mr4" />
                  Team Member Details ({teamSize - 1} additional {teamSize - 1 === 1 ? "member" : "members"})
                </p>

                <div className="grid grid-2 gap-3">
                  {Array.from({ length: teamSize - 1 }).map((_, index) => (
                    <div key={index} className="form-group">
                      <label className="form-label text-xs font-bold team-member-label">
                        Member {index + 2} Name
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter Member ${index + 2} Full Name`}
                        value={memberNames[index] || ""}
                        onChange={(e) => handleMemberNameChange(index, e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <button className="primary-btn team-submit-btn">
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
              <div key={team._id} className="data-card flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2 team-card-title">
                    <FaUsers className="team-card-icon" size={16} />
                    {team.teamName}
                  </h2>

                  <div className="flex flex-col gap-1 team-card-meta-group">
                    <p className="text-xs text-muted flex items-center gap-1">
                      <FaCrown className="team-card-leader-icon" size={11} />
                      Leader: <span className="font-bold team-card-meta-val">{team.leader?.name}</span>
                    </p>
                    <p className="text-xs text-muted">
                      Hackathon: <span className="font-semibold team-card-meta-val">{team.hackathon?.title}</span>
                    </p>
                    <p className="text-xs text-muted">
                      Total Size: <span className="badge badge-blue">{team.teamSize || 1} Members</span>
                    </p>
                  </div>

                  {team.memberNames && team.memberNames.length > 0 && (
                    <div className="team-members-section">
                      <p className="text-xs font-bold text-muted uppercase team-members-section-title">Team Members:</p>
                      <div className="flex flex-wrap gap-1">
                        {team.memberNames.map((name, idx) => (
                          <span key={idx} className="badge badge-slate team-member-badge">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={() => handleDelete(team._id)} className="danger-btn team-delete-btn">
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
