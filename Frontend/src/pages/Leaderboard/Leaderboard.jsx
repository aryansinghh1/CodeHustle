import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { getLeaderboard } from "../../services/leaderboardService";

function Leaderboard() {
  const { hackathonId } = useParams();

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await getLeaderboard(hackathonId);

      setLeaderboard(res.data.leaderboard);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Leaderboard
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full border rounded-xl">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-4">Rank</th>

                <th>Team</th>

                <th>Project</th>

                <th>Average Score</th>

              </tr>

            </thead>

            <tbody>

              {leaderboard.map((team) => (

                <tr
                  key={team.submissionId}
                  className="border-t text-center"
                >

                  <td className="p-4">

                    #{team.rank}

                  </td>

                  <td>

                    {team.teamName}

                  </td>

                  <td>

                    {team.projectName}

                  </td>

                  <td>

                    {team.averageScore}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}

export default Leaderboard;