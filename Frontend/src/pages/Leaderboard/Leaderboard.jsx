import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrophy, FaMedal } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { getLeaderboard } from "../../services/leaderboardService";
import "./Leaderboard.css";

function Leaderboard() {
  const { hackathonId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLeaderboard(); }, []);

  const fetchLeaderboard = async () => {
    try { const res = await getLeaderboard(hackathonId); setLeaderboard(res.data.leaderboard); }
    catch (err) { console.log(err); } finally { setLoading(false); }
  };

  const rankIcon = (rank) => {
    if (rank === 1) return <FaTrophy className="lb-rank-gold" size={16} />;
    if (rank === 2) return <FaMedal className="lb-rank-silver" size={16} />;
    if (rank === 3) return <FaMedal className="lb-rank-bronze" size={16} />;
    return <span className="text-muted font-bold">#{rank}</span>;
  };

  if (loading) return <MainLayout><Loader text="Loading leaderboard..." /></MainLayout>;

  return (
    <MainLayout>
      <div className="container section-spacing">
        <div className="page-header">
          <h1>Leaderboard</h1>
          <div className="accent-bar" />
          <p>Rankings based on average judge scores</p>
        </div>

        {leaderboard.length === 0 ? (
          <EmptyState title="No Rankings Yet" subtitle="Scores will appear here once judges submit their reviews." />
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th className="lb-rank-col">Rank</th>
                  <th>Team</th>
                  <th>Project</th>
                  <th className="lb-center-align">Average Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((team) => (
                  <tr key={team.submissionId}>
                    <td className="lb-center-align">
                      <div className="flex items-center justify-center">{rankIcon(team.rank)}</div>
                    </td>
                    <td className="font-bold">{team.teamName}</td>
                    <td>{team.projectName}</td>
                    <td className="lb-center-align">
                      <span className="badge badge-blue font-bold">{team.averageScore}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        )}
      </div>
    </MainLayout>
  );
}

export default Leaderboard;