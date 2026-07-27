import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUsers, FaExclamationTriangle } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getMyTeams } from "../../services/teamService";
import { registerHackathon, getMyRegistrations } from "../../services/registrationService";
import "./Register.css";

function Register() {
  const { hackathonId } = useParams();
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [alreadyRegisteredReg, setAlreadyRegisteredReg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [hackathonId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tRes, rRes] = await Promise.all([
        getMyTeams(),
        getMyRegistrations(),
      ]);
      setTeams(tRes.data.teams || []);

      const regs = rRes.data.registrations || [];
      const existing = regs.find((r) => {
        const hId = typeof r.hackathon === "object" ? r.hackathon._id : r.hackathon;
        return hId === hackathonId;
      });
      if (existing) {
        setAlreadyRegisteredReg(existing);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!selectedTeam) { toast.error("Please select a team"); return; }
    try {
      await registerHackathon({ hackathonId, teamId: selectedTeam });
      toast.success("Registration Submitted");
      navigate("/participant/dashboard");
    } catch (err) { toast.error(err.response?.data?.message || "Registration Failed"); }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader text="Loading team registration details..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container section-spacing register-container">
        <div className="page-header text-center">
          <h1>Register Team</h1>
          <div className="accent-bar register-accent-bar" />
          <p>Select your team to register for this hackathon</p>
        </div>

        {alreadyRegisteredReg ? (
          <div className="form-card text-center register-already-card">
            <FaExclamationTriangle size={32} className="register-warning-icon" />
            <h2 className="text-lg font-bold register-already-title">
              Already Registered
            </h2>
            <p className="text-sm text-slate-800 register-already-desc">
              You are already registered for this hackathon with team{" "}
              <strong>"{alreadyRegisteredReg.team?.teamName || "your team"}"</strong> (Status:{" "}
              <span className="badge badge-blue">{alreadyRegisteredReg.status}</span>).
            </p>
            <p className="text-xs text-muted register-already-sub">
              Participants are restricted to 1 team registration per hackathon.
            </p>
            <button onClick={() => navigate("/participant/my-registrations")} className="primary-btn register-btn-full-mt20">
              View My Registrations
            </button>
          </div>
        ) : (
          <div className="form-card text-center flex flex-col items-center">
            <div className="empty-icon register-icon-wrapper">
              <FaUsers />
            </div>

            <div className="form-group register-form-group">
              <label className="form-label">Select Team</label>
              <select className="input" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                <option value="">Choose a team...</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>{team.teamName}</option>
                ))}
              </select>
            </div>

            <button onClick={handleRegister} className="primary-btn register-btn-full-mt24">
              Register for Hackathon
            </button>
          </div>
        )}
        
      </div>
    </MainLayout>
  );
}

export default Register;