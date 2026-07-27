import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import HackathonCard from "../../components/hackathon/HackathonCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { getHackathons } from "../../services/hackathonService";
import MainLayout from "../../layouts/MainLayout";
import "./Listing.css";

function Listing() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [status, setStatus] = useState("");

  const fetchHackathons = async () => {
    try {
      setLoading(true);
      const res = await getHackathons({ search, mode, status });
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
      
      <div className="container section-spacing">

        <div className="page-header">
          <h1>Explore Hackathons</h1>
          <div className="accent-bar" />
          <p>Discover and join hackathons that match your interests</p>
        </div>

        {/* Filters Card */}
        <div className="form-card listing-filters-card">
          <div className="grid grid-3 gap-3">

            <div className="listing-search-wrapper">
              <FaSearch className="listing-search-icon" />
              <input
                type="text"
                placeholder="Search hackathons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input listing-search-input"
              />
            </div>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="input"
            >
              <option value="">All Modes</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input"
            >
              <option value="">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>

          </div>
        </div>

        {/* Results */}
        {loading ? (
          <Loader text="Fetching hackathons..." />
        ) : hackathons.length === 0 ? (
          <EmptyState
            title="No Hackathons Found"
            subtitle="Try adjusting your filters or check back later for new events."
          />
        ) : (
          <div className="grid grid-3 gap-6">
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