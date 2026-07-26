import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUsers } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import { getMyTeams } from "../../services/teamService";
import { registerHackathon } from "../../services/registrationService";

function Register() {
  const { hackathonId } = useParams();
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => { fetchTeams(); }, []);

  const fetchTeams = async () => {
    try { const res = await getMyTeams(); setTeams(res.data.teams); } catch (err) { console.log(err); }
  };

  const handleRegister = async () => {
    if (!selectedTeam) { toast.error("Please select a team"); return; }
    try {
      await registerHackathon({ hackathonId, teamId: selectedTeam });
      toast.success("Registration Submitted");
      navigate("/participant/dashboard");
    } catch (err) { toast.error(err.response?.data?.message || "Registration Failed"); }
  };

  return (
    <MainLayout>
      <div className="container section-spacing" style={{ maxWidth: 540 }}>
        <div className="page-header text-center">
          <h1>Register Team</h1>
          <div className="accent-bar" style={{ margin: "10px auto 0" }} />
          <p>Select your team to register for this hackathon</p>
        </div>

        <div className="form-card text-center flex flex-col items-center">
          <div className="empty-icon" style={{ margin: "0 auto 20px" }}>
            <FaUsers />
          </div>

          <div className="form-group" style={{ width: "100%", textAlign: "left" }}>
            <label className="form-label">Select Team</label>
            <select className="input" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
              <option value="">Choose a team...</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>{team.teamName}</option>
              ))}
            </select>
          </div>

          <button onClick={handleRegister} className="primary-btn" style={{ width: "100%", marginTop: 24 }}>
            Register for Hackathon
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default Register;