import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";

import {
  getHackathonRegistrations,
  approveRegistration,
  rejectRegistration,
} from "../../services/registrationService";

function Registrations() {
  const { id } = useParams();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const res = await getHackathonRegistrations(id);

      setRegistrations(res.data.registrations);
    } catch (err) {
      toast.error("Unable to load registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleApprove = async (registrationId) => {
    try {
      await approveRegistration(registrationId);

      toast.success("Registration Approved");

      fetchRegistrations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleReject = async (registrationId) => {
    try {
      await rejectRegistration(registrationId);

      toast.success("Registration Rejected");

      fetchRegistrations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
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

      <div className="max-w-7xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Registrations
        </h1>

        {registrations.length === 0 ? (
          <h2>No registrations found.</h2>
        ) : (
          <div className="space-y-6">

            {registrations.map((registration) => (

              <div
                key={registration._id}
                className="bg-white border rounded-xl shadow p-6"
              >

                <h2 className="text-2xl font-bold">
                  {registration.team.teamName}
                </h2>

                <p className="mt-2">
                  Hackathon : {registration.hackathon.title}
                </p>

                <p className="mt-2">
                  Status : {registration.status}
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() =>
                      handleApprove(registration._id)
                    }
                    className="bg-green-600 text-white px-5 py-2 rounded-lg"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleReject(registration._id)
                    }
                    className="bg-red-600 text-white px-5 py-2 rounded-lg"
                  >
                    Reject
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default Registrations;