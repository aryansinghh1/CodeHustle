import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import {
  getMyRegistrations,
  cancelRegistration,
} from "../../services/registrationService";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  const fetchRegistrations = async () => {
    try {
      const res = await getMyRegistrations();
      setRegistrations(res.data.registrations);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel registration?")) return;

    try {
      await cancelRegistration(id);

      toast.success("Registration Cancelled");

      fetchRegistrations();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed"
      );
    }
  };

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Registrations
        </h1>

        <div className="space-y-5">

          {registrations.map((registration) => (

            <div
              key={registration._id}
              className="border rounded-xl p-5 bg-white"
            >

              <h2 className="text-2xl font-bold">
                {registration.hackathon.title}
              </h2>

              <p>
                Team : {registration.team.teamName}
              </p>

              <p>
                Status : {registration.status}
              </p>

              <button
                onClick={() => handleCancel(registration._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default MyRegistrations;