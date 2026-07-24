import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { getHackathonById } from "../../services/hackathonService";
import { useNavigate } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHackathon = async () => {
    try {
      const res = await getHackathonById(id);
      setHackathon(res.data.hackathon);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathon();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-2xl">Loading...</div>
      </MainLayout>
    );
  }

  if (!hackathon) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-2xl">Hackathon Not Found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 border px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          ← Back
        </button>

        <img
          src={
            hackathon.bannerImage ||
            "https://placehold.co/1200x400?text=Hackathon"
          }
          alt={hackathon.title}
          className="w-full h-96 object-cover rounded-xl"
        />

        <h1 className="text-5xl font-bold mt-8">{hackathon.title}</h1>

        <p className="mt-5 text-lg text-gray-600">{hackathon.description}</p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="space-y-4">
            <p>
              <strong>Theme:</strong> {hackathon.theme}
            </p>

            <p>
              <strong>Mode:</strong> {hackathon.mode}
            </p>

            <p>
              <strong>Venue:</strong> {hackathon.venue}
            </p>

            <p>
              <strong>Prize Pool:</strong> ₹ {hackathon.prizePool}
            </p>

            <p>
              <strong>Maximum Team Size:</strong> {hackathon.maxTeamSize}
            </p>
          </div>

          <div className="space-y-4">
            <p>
              <strong>Registration Deadline:</strong>{" "}
              {new Date(hackathon.registrationDeadline).toLocaleDateString()}
            </p>

            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(hackathon.startDate).toLocaleDateString()}
            </p>

            <p>
              <strong>End Date:</strong>{" "}
              {new Date(hackathon.endDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Status:</strong> {hackathon.status}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Rules</h2>

          <ul className="list-disc ml-6 space-y-2">
            {hackathon.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Judging Criteria</h2>

          <ul className="list-disc ml-6 space-y-2">
            {hackathon.judgingCriteria.map((criteria, index) => (
              <li key={index}>{criteria}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => navigate(`/register/${hackathon._id}`)}
          className="mt-12 bg-[#2b2b2b] text-white px-8 py-4 rounded-lg hover:bg-black"
        >
          Register Team
        </button>
      </div>
    </MainLayout>
  );
}

export default Details;
