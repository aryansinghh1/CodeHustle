import { useEffect, useState } from "react";
import HackathonCard from "../../components/hackathon/HackathonCard";
import { getHackathons } from "../../services/hackathonService";
import MainLayout from "../../layouts/MainLayout";

function Listing() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [status, setStatus] = useState("");

  const fetchHackathons = async () => {
    try {
      setLoading(true);

      const res = await getHackathons({
        search,
        mode,
        status,
      });

      setHackathons(res.data.hackathons);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, [search, mode, status]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Explore Hackathons
        </h1>

        {/* Filters */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <input
            type="text"
            placeholder="Search Hackathons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3"
          />

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">All Modes</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>

        </div>

        {/* Loading */}

        {loading ? (
          <h2 className="text-center text-xl">
            Loading...
          </h2>
        ) : hackathons.length === 0 ? (
          <h2 className="text-center text-gray-500">
            No Hackathons Found
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {hackathons.map((hackathon) => (
              <HackathonCard
                key={hackathon._id}
                hackathon={hackathon}
              />
            ))}

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default Listing;