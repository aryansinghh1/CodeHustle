import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaTrophy, FaUsers, FaCalendarAlt, FaLaptopCode } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getHackathonById } from "../../services/hackathonService";
import { useAuth } from "../../context/AuthContext";
import "./Details.css";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  const isNonParticipant = user && ["admin", "organizer", "judge"].includes(user.role);

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
        <Loader text="Loading hackathon details..." />
      </MainLayout>
    );
  }

  if (!hackathon) {
    return (
      <MainLayout>
        <div className="container text-center section-spacing">
          <h2 className="text-2xl font-bold details-not-found-title">Hackathon Not Found</h2>
          <button onClick={() => navigate(-1)} className="outline-btn details-not-found-btn">
            <FaArrowLeft size={12} /> Go Back
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container section-spacing details-container">

        <button onClick={() => navigate(-1)} className="outline-btn details-back-btn">
          <FaArrowLeft size={12} /> Back
        </button>

        {/* Banner Card */}
        <div className="data-card details-banner-card">
          <img
            src={hackathon.bannerImage || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"}
            alt={hackathon.title}
            className="details-banner-img"
          />

          <div className="details-banner-content">
            <div className="flex gap-2 details-badges-row">
              <span className="badge badge-blue">{hackathon.mode}</span>
              <span className="badge badge-green">{hackathon.status}</span>
            </div>

            <h1 className="text-3xl font-extrabold details-title">
              {hackathon.title}
            </h1>

            <p className="text-muted text-sm details-desc">
              {hackathon.description}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-2 gap-4 details-info-grid">

          <div className="data-card">
            <h3 className="text-base font-bold details-card-title">Event Details</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FaLaptopCode className="details-icon-primary" />
                <div>
                  <p className="text-xs text-muted font-bold">Theme</p>
                  <p className="text-sm font-semibold">{hackathon.theme}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="details-icon-primary" />
                <div>
                  <p className="text-xs text-muted font-bold">Venue</p>
                  <p className="text-sm font-semibold">{hackathon.venue || "Online"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaTrophy className="details-icon-success" />
                <div>
                  <p className="text-xs text-muted font-bold">Prize Pool</p>
                  <p className="text-sm font-semibold">₹ {hackathon.prizePool}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="details-icon-purple" />
                <div>
                  <p className="text-xs text-muted font-bold">Max Team Size</p>
                  <p className="text-sm font-semibold">{hackathon.maxTeamSize} members</p>
                </div>
              </div>
            </div>
          </div>

          <div className="data-card">
            <h3 className="text-base font-bold details-card-title">Important Dates</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="details-icon-danger" />
                <div>
                  <p className="text-xs text-muted font-bold">Registration Deadline</p>
                  <p className="text-sm font-semibold">
                    {new Date(hackathon.registrationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="details-icon-success" />
                <div>
                  <p className="text-xs text-muted font-bold">Start Date</p>
                  <p className="text-sm font-semibold">
                    {new Date(hackathon.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="details-icon-slate" />
                <div>
                  <p className="text-xs text-muted font-bold">End Date</p>
                  <p className="text-sm font-semibold">
                    {new Date(hackathon.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Rules */}
        
        <div className="data-card details-rules-card">
          <h3 className="text-base font-bold details-card-title">Rules</h3>
          <ul className="flex flex-col gap-2 details-rules-list">
            {hackathon.rules.map((rule, index) => (
              <li key={index} className="text-sm text-muted details-list-item">{rule}</li>
            ))}
          </ul>
        </div>

        {/* Judging Criteria */}
        <div className="data-card details-judging-card">
          <h3 className="text-base font-bold details-card-title">Judging Criteria</h3>
          <ul className="flex flex-col gap-2 details-rules-list">
            {hackathon.judgingCriteria.map((criteria, index) => (
              <li key={index} className="text-sm text-muted details-list-item">{criteria}</li>
            ))}
          </ul>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-3 flex-wrap">
          {!isNonParticipant && (
            <button
              onClick={() => navigate(`/register/${hackathon._id}`)}
              className="primary-btn details-action-btn-primary"
            >
              Register Your Team
            </button>
          )}

          <Link
            to={`/leaderboard/${hackathon._id}`}
            className="secondary-btn details-action-btn-secondary"
          >
            <FaTrophy /> View Leaderboard
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default Details;
