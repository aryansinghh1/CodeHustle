import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import {
  getMyHackathons,
  deleteHackathon,
} from "../../services/hackathonService";

function MyHackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHackathons = async () => {
    try {
      const res = await getMyHackathons();
      setHackathons(res.data.hackathons);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this hackathon?"
    );

    if (!confirmDelete) return;

    try {
      await deleteHackathon(id);

      toast.success("Hackathon Deleted");

      fetchHackathons();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Delete Failed"
      );
    }
  };

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

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            My Hackathons
          </h1>

          <Link
            to="/organizer/create-hackathon"
            className="bg-[#2b2b2b] text-white px-5 py-3 rounded-lg"
          >
            + Create
          </Link>

        </div>

        {hackathons.length === 0 ? (

          <h2>No Hackathons Created.</h2>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {hackathons.map((hackathon) => (

              <div
                key={hackathon._id}
                className="border rounded-xl bg-white shadow p-6"
              >

                <h2 className="text-2xl font-bold">
                  {hackathon.title}
                </h2>

                <p className="mt-3">
                  {hackathon.theme}
                </p>

                <p className="mt-2">
                  {hackathon.mode}
                </p>

                <p className="mt-2">
                  Prize : ₹ {hackathon.prizePool}
                </p>

                <div className="flex gap-3 mt-6 flex-wrap">

                  <Link
                    to={`/organizer/edit-hackathon/${hackathon._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(hackathon._id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                  <Link
                    to={`/organizer/registrations/${hackathon._id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Registrations
                  </Link>

                  <Link
                    to={`/organizer/submissions/${hackathon._id}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                  >
                    Submissions
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </MainLayout>
  );
}

export default MyHackathons;