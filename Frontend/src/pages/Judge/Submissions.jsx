import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { getJudgeSubmissions } from "../../services/submissionService";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await getJudgeSubmissions();
      setSubmissions(res.data.submissions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Assigned Projects
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {submissions.map((submission) => (

            <div
              key={submission._id}
              className="bg-white border rounded-xl shadow p-6"
            >

              <h2 className="text-2xl font-bold">
                {submission.projectName}
              </h2>

              <p className="mt-3">
                Team : {submission.team.teamName}
              </p>

              <p>
                Hackathon :
                {" "}
                {submission.hackathon.title}
              </p>

              <Link
                to={`/judge/review/${submission._id}`}
                className="inline-block mt-5 bg-[#2b2b2b] text-white px-5 py-2 rounded-lg"
              >
                Review Project
              </Link>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default Submissions;