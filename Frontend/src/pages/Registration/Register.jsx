import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import { getMyTeams } from "../../services/teamService";
import { registerHackathon } from "../../services/registrationService";

function Register() {
  const { hackathonId } = useParams();
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await getMyTeams();
      setTeams(res.data.teams);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async () => {
    if (!selectedTeam) {
      toast.error("Please select a team");
      return;
    }

    try {
      await registerHackathon({
        hackathonId,
        teamId: selectedTeam,
      });

      toast.success("Registration Submitted");

      navigate("/participant/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <MainLayout>

      <div className="max-w-xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          Register Team
        </h1>

        <select
          className="w-full border p-3 rounded-lg"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="">Select Team</option>

          {teams.map((team) => (
            <option
              key={team._id}
              value={team._id}
            >
              {team.teamName}
            </option>
          ))}

        </select>

        <button
          onClick={handleRegister}
          className="mt-6 w-full bg-[#2b2b2b] text-white py-3 rounded-lg"
        >
          Register
        </button>

      </div>

    </MainLayout>
  );
}

export default Register;