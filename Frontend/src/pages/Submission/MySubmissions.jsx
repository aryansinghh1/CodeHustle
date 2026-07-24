import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import {
  getMySubmissions,
  deleteSubmission,
} from "../../services/submissionService";

function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const res = await getMySubmissions();
      setSubmissions(res.data.submissions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this submission?")) return;

    try {
      await deleteSubmission(id);

      toast.success("Submission Deleted");

      fetchSubmissions();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Delete Failed"
      );
    }
  };

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto py-10 px-6">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            My Submissions
          </h1>

          <Link
            to="/submission/create"
            className="bg-[#2b2b2b] text-white px-5 py-3 rounded-lg"
          >
            Submit Project
          </Link>

        </div>

        {submissions.length === 0 ? (

          <h2>No Submission Yet</h2>

        ) : (

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
                  Hackathon : {submission.hackathon.title}
                </p>

                <p>
                  Status : {submission.status}
                </p>

                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/submission/edit/${submission._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(submission._id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
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

export default MySubmissions;