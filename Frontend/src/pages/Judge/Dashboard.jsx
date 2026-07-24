import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { getJudgeDashboard } from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    assignedProjects: 0,
    pendingReviews: 0,
    completedReviews: 0,
  });

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Judge Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <Card
            title="Assigned Projects"
            value={dashboard.assignedProjects}
          />

          <Card
            title="Pending Reviews"
            value={dashboard.pendingReviews}
          />

          <Card
            title="Completed Reviews"
            value={dashboard.completedReviews}
          />

        </div>

        <div className="mt-10">

          <Link
            to="/judge/submissions"
            className="bg-[#2b2b2b] text-white px-6 py-3 rounded-lg"
          >
            View Assigned Projects
          </Link>

        </div>

      </div>

    </MainLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white border rounded-xl shadow p-6">

      <p>{title}</p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>

    </div>
  );
}

export default Dashboard;