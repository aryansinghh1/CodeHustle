import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClipboardList, FaProjectDiagram, FaStar, FaSearch, FaPaperPlane, FaListAlt } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getParticipantDashboard } from "../../services/dashboardService";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState({
    myTeams: 0, registeredHackathons: 0, submissions: 0, reviewsReceived: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getParticipantDashboard();
      setDashboard(res.data.dashboard);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <MainLayout><Loader text="Loading your dashboard..." /></MainLayout>;

  const stats = [
    { icon: <FaUsers style={{ color: "var(--primary)" }} />, label: "My Teams", value: dashboard.myTeams },
    { icon: <FaClipboardList style={{ color: "var(--purple)" }} />, label: "Registered", value: dashboard.registeredHackathons },
    { icon: <FaProjectDiagram style={{ color: "var(--success)" }} />, label: "Submissions", value: dashboard.submissions },
    { icon: <FaStar style={{ color: "var(--warning)" }} />, label: "Reviews", value: dashboard.reviewsReceived },
  ];

  return (
    <MainLayout>
      <div className="container section-spacing">

        <div className="page-header">
          <h1>Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
          <div className="accent-bar" />
          <p>Here's an overview of your hackathon journey</p>
        </div>

        <div className="grid grid-4 gap-4" style={{ marginBottom: 36 }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                <div>
                  <div className="text-3xl font-extrabold" style={{ color: "var(--slate-900)" }}>{stat.value}</div>
                  <div className="text-xs text-muted font-bold" style={{ marginTop: 4 }}>{stat.label}</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "var(--slate-50)", border: "1px solid var(--slate-200)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold" style={{ color: "var(--slate-900)", marginBottom: 16 }}>Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/hackathons" className="secondary-btn">
              <FaSearch size={13} /> Browse Hackathons
            </Link>
            <Link to="/teams" className="primary-btn">
              <FaUsers size={13} /> My Teams
            </Link>
            <Link to="/my-registrations" className="outline-btn">
              <FaListAlt size={13} /> My Registrations
            </Link>
            <Link to="/my-submissions" className="outline-btn">
              <FaPaperPlane size={13} /> My Submissions
            </Link>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;
