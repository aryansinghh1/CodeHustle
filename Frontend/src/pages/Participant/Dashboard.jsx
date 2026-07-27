import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClipboardList, FaProjectDiagram, FaStar, FaSearch, FaPaperPlane, FaListAlt } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getParticipantDashboard } from "../../services/dashboardService";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

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
    { icon: <FaUsers className="part-icon-primary" />, label: "My Teams", value: dashboard.myTeams },
    { icon: <FaClipboardList className="part-icon-purple" />, label: "Registered", value: dashboard.registeredHackathons },
    { icon: <FaProjectDiagram className="part-icon-success" />, label: "Submissions", value: dashboard.submissions },
    { icon: <FaStar className="part-icon-warning" />, label: "Reviews", value: dashboard.reviewsReceived },
  ];

  return (
    <MainLayout>
      <div className="container section-spacing">

        <div className="page-header">
          <h1>Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
          <div className="accent-bar" />
          <p>Here's an overview of your hackathon journey</p>
        </div>

        <div className="grid grid-4 gap-4 part-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="flex items-center justify-between part-stat-header">
                <div>
                  <div className="text-3xl font-extrabold part-stat-val">{stat.value}</div>
                  <div className="text-xs text-muted font-bold part-stat-lbl">{stat.label}</div>
                </div>
                <div className="part-stat-icon-wrapper">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold part-section-title">Quick Actions</h2>
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
