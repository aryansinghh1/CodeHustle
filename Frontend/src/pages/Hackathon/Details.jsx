import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaTrophy, FaUsers, FaCalendarAlt, FaLaptopCode } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getHackathonById } from "../../services/hackathonService";
import { useAuth } from "../../context/AuthContext";

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
          <h2 className="text-2xl font-bold" style={{ color: "var(--slate-800)" }}>Hackathon Not Found</h2>
          <button onClick={() => navigate(-1)} className="outline-btn" style={{ marginTop: 24 }}>
            <FaArrowLeft size={12} /> Go Back
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container section-spacing" style={{ maxWidth: 1000 }}>

        <button onClick={() => navigate(-1)} className="outline-btn" style={{ marginBottom: 24 }}>
          <FaArrowLeft size={12} /> Back
        </button>

        {/* Banner Card */}
        <div className="data-card" style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}>
          <img
            src={hackathon.bannerImage || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"}
            alt={hackathon.title}
            style={{ width: "100%", height: 280, objectFit: "cover" }}
          />

          <div style={{ padding: 28 }}>
            <div className="flex gap-2" style={{ marginBottom: 12 }}>
              <span className="badge badge-blue">{hackathon.mode}</span>
              <span className="badge badge-green">{hackathon.status}</span>
            </div>

            <h1 className="text-3xl font-extrabold" style={{ color: "var(--slate-900)" }}>
              {hackathon.title}
            </h1>

            <p className="text-muted text-sm" style={{ marginTop: 12, lineHeight: 1.6 }}>
              {hackathon.description}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-2 gap-4" style={{ marginBottom: 24 }}>

          <div className="data-card">
            <h3 className="text-base font-bold" style={{ color: "var(--slate-900)", marginBottom: 16 }}>Event Details</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FaLaptopCode style={{ color: "var(--primary)" }} />
                <div>
                  <p className="text-xs text-muted font-bold">Theme</p>
                  <p className="text-sm font-semibold">{hackathon.theme}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt style={{ color: "var(--primary)" }} />
                <div>
                  <p className="text-xs text-muted font-bold">Venue</p>
                  <p className="text-sm font-semibold">{hackathon.venue || "Online"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaTrophy style={{ color: "var(--success)" }} />
                <div>
                  <p className="text-xs text-muted font-bold">Prize Pool</p>
                  <p className="text-sm font-semibold">₹ {hackathon.prizePool}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers style={{ color: "var(--purple)" }} />
                <div>
                  <p className="text-xs text-muted font-bold">Max Team Size</p>
                  <p className="text-sm font-semibold">{hackathon.maxTeamSize} members</p>
                </div>
              </div>
            </div>
          </div>

          <div className="data-card">
            <h3 className="text-base font-bold" style={{ color: "var(--slate-900)", marginBottom: 16 }}>Important Dates</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FaCalendarAlt style={{ color: "var(--danger)" }} />
                <div>
                  <p className="text-xs text-muted font-bold">Registration Deadline</p>
                  <p className="text-sm font-semibold">
                    {new Date(hackathon.registrationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendarAlt style={{ color: "var(--success)" }} />
                <div>
                  <p className="text-xs text-muted font-bold">Start Date</p>
                  <p className="text-sm font-semibold">
                    {new Date(hackathon.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendarAlt style={{ color: "var(--slate-400)" }} />
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
        
        <div className="data-card" style={{ marginBottom: 24 }}>
          <h3 className="text-base font-bold" style={{ color: "var(--slate-900)", marginBottom: 12 }}>Rules</h3>
          <ul className="flex flex-col gap-2" style={{ paddingLeft: 20 }}>
            {hackathon.rules.map((rule, index) => (
              <li key={index} className="text-sm text-muted" style={{ lineHeight: 1.5 }}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* Judging Criteria */}
        <div className="data-card" style={{ marginBottom: 32 }}>
          <h3 className="text-base font-bold" style={{ color: "var(--slate-900)", marginBottom: 12 }}>Judging Criteria</h3>
          <ul className="flex flex-col gap-2" style={{ paddingLeft: 20 }}>
            {hackathon.judgingCriteria.map((criteria, index) => (
              <li key={index} className="text-sm text-muted" style={{ lineHeight: 1.5 }}>{criteria}</li>
            ))}
          </ul>
        </div>

        {/* Register Button */}
        {!isNonParticipant && (
          <button
            onClick={() => navigate(`/register/${hackathon._id}`)}
            className="primary-btn"
            style={{ padding: "16px 36px", fontSize: 16 }}
          >
            Register Your Team
          </button>
        )}

      </div>
    </MainLayout>
  );
}

export default Details;
