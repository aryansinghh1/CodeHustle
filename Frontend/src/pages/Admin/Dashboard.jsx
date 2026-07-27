import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaRocket, FaUsersCog, FaProjectDiagram, FaGavel, FaBuilding, FaUserPlus, FaListAlt } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getAdminDashboard } from "../../services/dashboardService";
import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0, totalHackathons: 0, totalTeams: 0, totalProjects: 0, totalJudges: 0, totalOrganizers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getAdminDashboard();
      setDashboard(res.data.dashboard);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <MainLayout><Loader text="Loading admin dashboard..." /></MainLayout>;

  const stats = [
    { label: "Users", value: dashboard.totalUsers },
    { label: "Hackathons", value: dashboard.totalHackathons },
    { label: "Teams", value: dashboard.totalTeams },
    { label: "Projects", value: dashboard.totalProjects },
    { label: "Judges", value: dashboard.totalJudges },
    { label: "Organizers", value: dashboard.totalOrganizers },
  ];

  return (
    <MainLayout>
      
      <div className="container section-spacing">

        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <div className="accent-bar" />
          <p>Platform overview and management tools</p>
        </div>

        <div className="grid grid-6 gap-3 admin-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card admin-stat-card">
              <div>
                <div className="text-2xl font-extrabold admin-stat-value">{stat.value}</div>
                <div className="text-xs text-muted font-bold admin-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold admin-section-title">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/users" className="secondary-btn">
              <FaListAlt size={13} /> Manage Users
            </Link>
            <Link to="/admin/create-user" className="primary-btn">
              <FaUserPlus size={13} /> Create Organizer / Judge
            </Link>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;
