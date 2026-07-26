import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaProjectDiagram, FaClock, FaCheckCircle, FaEye } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getJudgeDashboard } from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    assignedProjects: 0, pendingReviews: 0, completedReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getJudgeDashboard();
      setDashboard(res.data.dashboard);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <MainLayout><Loader text="Loading judge dashboard..." /></MainLayout>;

  const stats = [
    { icon: <FaProjectDiagram style={{ color: "var(--primary)" }} />, label: "Assigned Projects", value: dashboard.assignedProjects },
    { icon: <FaClock style={{ color: "var(--warning)" }} />, label: "Pending Reviews", value: dashboard.pendingReviews },
    { icon: <FaCheckCircle style={{ color: "var(--success)" }} />, label: "Completed Reviews", value: dashboard.completedReviews },
  ];

  return (
    <MainLayout>
      <div className="container section-spacing">

        <div className="page-header">
          <h1>Judge Dashboard</h1>
          <div className="accent-bar" />
          <p>Review and evaluate project submissions</p>
        </div>

        <div className="grid grid-3 gap-4" style={{ marginBottom: 36 }}>
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
            <Link to="/judge/submissions" className="primary-btn">
              <FaEye size={13} /> View Assigned Projects
            </Link>
          </div>
        </div>

      </div>
      
    </MainLayout>
  );
}

export default Dashboard;