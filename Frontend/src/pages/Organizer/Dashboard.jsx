import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaClipboardList, FaProjectDiagram, FaCheckCircle, FaClock, FaPlus, FaListAlt } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getOrganizerDashboard } from "../../services/dashboardService";
import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    myHackathons: 0, registrations: 0, submissions: 0, completedHackathons: 0, upcomingHackathons: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getOrganizerDashboard();
      setDashboard(res.data.dashboard);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <MainLayout><Loader text="Loading organizer dashboard..." /></MainLayout>;

  const stats = [
    { icon: <FaRocket className="organizer-icon-primary" />, label: "My Hackathons", value: dashboard.myHackathons },
    { icon: <FaClipboardList className="organizer-icon-purple" />, label: "Registrations", value: dashboard.registrations },
    { icon: <FaProjectDiagram className="organizer-icon-success" />, label: "Submissions", value: dashboard.submissions },
    { icon: <FaCheckCircle className="organizer-icon-warning" />, label: "Completed", value: dashboard.completedHackathons },
    { icon: <FaClock className="organizer-icon-slate" />, label: "Upcoming", value: dashboard.upcomingHackathons },
  ];

  return (
    <MainLayout>
      <div className="container section-spacing">

        <div className="page-header">
          <h1>Organizer Dashboard</h1>
          <div className="accent-bar" />
          <p>Manage your hackathons and track engagement</p>
        </div>

        <div className="grid grid-5 gap-3 organizer-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="flex items-center justify-between organizer-stat-header">
                <div>
                  <div className="text-2xl font-extrabold organizer-stat-val">{stat.value}</div>
                  <div className="text-xs text-muted font-bold organizer-stat-lbl">{stat.label}</div>
                </div>
                <div className="organizer-stat-icon-bg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold organizer-section-title">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/organizer/create-hackathon" className="primary-btn">
              <FaPlus size={12} /> Create Hackathon
            </Link>
            <Link to="/organizer/my-hackathons" className="secondary-btn">
              <FaListAlt size={12} /> My Hackathons
            </Link>
          </div>
        </div>

      </div>
    </MainLayout>
    
  );
}

export default Dashboard;