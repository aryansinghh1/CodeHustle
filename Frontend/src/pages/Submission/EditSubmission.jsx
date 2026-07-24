import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import {
  getSubmissionById,
  updateSubmission,
} from "../../services/submissionService";

function EditSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    projectName: "",
    problemStatement: "",
    solution: "",
    description: "",
    githubRepo: "",
    liveDemo: "",
    techStack: "",
    screenshots: "",
    presentationPDF: "",
    demoVideo: "",
  });

  useEffect(() => {
    fetchSubmission();
  }, []);

  const fetchSubmission = async () => {
    try {
      const res = await getSubmissionById(id);

      const submission = res.data.submission;

      setFormData({
        projectName: submission.projectName,
        problemStatement: submission.problemStatement,
        solution: submission.solution,
        description: submission.description,
        githubRepo: submission.githubRepo,
        liveDemo: submission.liveDemo,
        techStack: submission.techStack.join(", "),
        screenshots: submission.screenshots.join(", "),
        presentationPDF: submission.presentationPDF,
        demoVideo: submission.demoVideo,
      });
    } catch (err) {
      toast.error("Unable to load submission");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateSubmission(id, {
        ...formData,
        techStack: formData.techStack
          .split(",")
          .map((item) => item.trim()),
        screenshots: formData.screenshots
          .split(",")
          .map((item) => item.trim()),
      });

      toast.success("Submission Updated");

      navigate("/my-submissions");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Update Failed"
      );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Edit Submission
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >
          <input
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="githubRepo"
            value={formData.githubRepo}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <textarea
            rows={3}
            name="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <textarea
            rows={3}
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <input
            name="liveDemo"
            value={formData.liveDemo}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="demoVideo"
            value={formData.demoVideo}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="presentationPDF"
            value={formData.presentationPDF}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <input
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <input
            name="screenshots"
            value={formData.screenshots}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button className="bg-[#2b2b2b] text-white py-3 rounded-lg md:col-span-2">
            Update Submission
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export default EditSubmission;