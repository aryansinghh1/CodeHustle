import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { getParticipantDashboard } from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    myTeams: 0,
    registeredHackathons: 0,
    submissions: 0,
    reviewsReceived: 0,
  });
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-2xl">Loading Dashboard...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-10">Participant Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="My Teams" value={dashboard.myTeams} />

          <DashboardCard
            title="Registered Hackathons"
            value={dashboard.registeredHackathons}
          />

          <DashboardCard title="Submissions" value={dashboard.submissions} />

          <DashboardCard
            title="Reviews Received"
            value={dashboard.reviewsReceived}
          />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5">Quick Actions</h2>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/hackathons"
              className="bg-[#2b2b2b] text-white px-6 py-3 rounded-lg"
            >
              Browse Hackathons
            </Link>

            <Link
              to="/teams"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              My Teams
            </Link>

            <Link
              to="/my-registrations"
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              My Registrations
            </Link>

            <Link
              to="/submission"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg"
            >
              My Submission
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-gray-500">{title}</h3>

      <h2 className="text-4xl font-bold mt-3">{value}</h2>
    </div>
  );
}

export default Dashboard;
