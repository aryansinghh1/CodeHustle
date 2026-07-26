import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalHackathons: 0,
    totalTeams: 0,
    totalProjects: 0,
    totalJudges: 0,
    totalOrganizers: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getAdminDashboard();
      setDashboard(res.data.dashboard);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Card title="Users" value={dashboard.totalUsers} />
          <Card title="Hackathons" value={dashboard.totalHackathons} />
          <Card title="Teams" value={dashboard.totalTeams} />
          <Card title="Projects" value={dashboard.totalProjects} />
          <Card title="Judges" value={dashboard.totalJudges} />
          <Card title="Organizers" value={dashboard.totalOrganizers} />
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            to="/admin/users"
            className="bg-[#2b2b2b] text-white px-5 py-3 rounded-lg"
          >
            Manage Users
          </Link>

          <Link
            to="/admin/hackathons"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Manage Hackathons
          </Link>

          <Link
            to="/admin/create-user"
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            Create Organizer / Judge
          </Link>

          
        </div>
      </div>
    </MainLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-xl border p-6">
      <p>{title}</p>
      <h2 className="text-4xl font-bold mt-3">{value}</h2>
    </div>
  );
}

export default Dashboard;
