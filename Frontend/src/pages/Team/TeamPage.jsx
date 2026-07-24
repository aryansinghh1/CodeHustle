import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getHackathons } from "../../services/hackathonService";

import MainLayout from "../../layouts/MainLayout";

import { createTeam, getMyTeams, deleteTeam } from "../../services/teamService";

function TeamPage() {
  const [teams, setTeams] = useState([]);
  const [hackathons, setHackathons] = useState([]);

  const [teamName, setTeamName] = useState("");
  const [hackathonId, setHackathonId] = useState("");

  const fetchTeams = async () => {
    try {
      const res = await getMyTeams();
      setTeams(res.data.teams);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHackathons = async () => {
    try {
      const res = await getHackathons();

      setHackathons(res.data.hackathons);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchHackathons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createTeam({
        teamName,
        hackathon: hackathonId,
      });

      toast.success("Team Created");

      setTeamName("");
      setHackathonId("");

      fetchTeams();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team?")) return;

    try {
      await deleteTeam(id);

      toast.success("Team Deleted");

      fetchTeams();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">My Teams</h1>

        <form
          onSubmit={handleCreate}
          className="bg-white border rounded-xl p-6 space-y-4 mb-10"
        >
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            value={hackathonId}
            onChange={(e) => setHackathonId(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Hackathon</option>

            {hackathons.map((hackathon) => (
              <option key={hackathon._id} value={hackathon._id}>
                {hackathon.title}
              </option>
            ))}
          </select>

          <button className="bg-[#2b2b2b] text-white px-6 py-3 rounded-lg">
            Create Team
          </button>
        </form>

        <div className="grid md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div
              key={team._id}
              className="border rounded-xl p-6 bg-white shadow"
            >
              <h2 className="text-2xl font-bold">{team.teamName}</h2>

              <p className="mt-3">Leader : {team.leader.name}</p>

              <p>Hackathon : {team.hackathon?.title}</p>

              <p>Members : {team.members.length}</p>

              <button
                onClick={() => handleDelete(team._id)}
                className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete Team
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default TeamPage;
