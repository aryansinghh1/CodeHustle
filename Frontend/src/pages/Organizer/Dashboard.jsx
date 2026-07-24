import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { getOrganizerDashboard } from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    myHackathons: 0,
    registrations: 0,
    submissions: 0,
    completedHackathons: 0,
    upcomingHackathons: 0,
  });

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-2xl">
          Loading Dashboard...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-10">
          Organizer Dashboard
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

          <Card title="My Hackathons" value={dashboard.myHackathons} />
          <Card title="Registrations" value={dashboard.registrations} />
          <Card title="Submissions" value={dashboard.submissions} />
          <Card title="Completed" value={dashboard.completedHackathons} />
          <Card title="Upcoming" value={dashboard.upcomingHackathons} />

        </div>

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/organizer/create-hackathon"
              className="bg-[#2b2b2b] text-white px-6 py-3 rounded-lg"
            >
              Create Hackathon
            </Link>

            <Link
              to="/organizer/my-hackathons"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              My Hackathons
            </Link>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-4xl font-bold mt-3">{value}</h2>
    </div>
  );
}

export default Dashboard;