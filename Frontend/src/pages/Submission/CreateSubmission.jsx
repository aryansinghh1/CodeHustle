import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";

import { getMyTeams } from "../../services/teamService";
import { getHackathons } from "../../services/hackathonService";
import { createSubmission } from "../../services/submissionService";

function CreateSubmission() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [hackathons, setHackathons] = useState([]);

  const [formData, setFormData] = useState({
    team: "",
    hackathon: "",
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
    fetchTeams();
    fetchHackathons();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await getMyTeams();
      setTeams(res.data.teams);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHackathons = async () => {
    try {
      const res = await getHackathons();
      setHackathons(res.data.hackathons);
    } catch (err) {
      console.log(err);
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
      await createSubmission({
        ...formData,

        techStack: formData.techStack
          .split(",")
          .map((item) => item.trim()),

        screenshots: formData.screenshots
          .split(",")
          .map((item) => item.trim()),
      });

      toast.success("Project Submitted");

      navigate("/my-submissions");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Submission Failed"
      );
    }
  };

  return (
    <MainLayout>

      <div className="max-w-5xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Submit Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <select
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          >
            <option value="">Select Team</option>

            {teams.map((team) => (
              <option
                key={team._id}
                value={team._id}
              >
                {team.teamName}
              </option>
            ))}
          </select>

          <select
            name="hackathon"
            value={formData.hackathon}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          >
            <option value="">Select Hackathon</option>

            {hackathons.map((hackathon) => (
              <option
                key={hackathon._id}
                value={hackathon._id}
              >
                {hackathon.title}
              </option>
            ))}
          </select>

          <input
            name="projectName"
            placeholder="Project Name"
            className="border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <input
            name="githubRepo"
            placeholder="GitHub Repository"
            className="border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <textarea
            rows={3}
            name="problemStatement"
            placeholder="Problem Statement"
            className="border rounded-lg p-3 md:col-span-2"
            onChange={handleChange}
            required
          />

          <textarea
            rows={3}
            name="solution"
            placeholder="Solution"
            className="border rounded-lg p-3 md:col-span-2"
            onChange={handleChange}
            required
          />

          <textarea
            rows={4}
            name="description"
            placeholder="Project Description"
            className="border rounded-lg p-3 md:col-span-2"
            onChange={handleChange}
            required
          />

          <input
            name="liveDemo"
            placeholder="Live Demo URL"
            className="border rounded-lg p-3"
            onChange={handleChange}
          />

          <input
            name="demoVideo"
            placeholder="Demo Video URL"
            className="border rounded-lg p-3"
            onChange={handleChange}
          />

          <input
            name="presentationPDF"
            placeholder="Presentation PDF URL"
            className="border rounded-lg p-3 md:col-span-2"
            onChange={handleChange}
          />

          <input
            name="techStack"
            placeholder="React, Node, MongoDB..."
            className="border rounded-lg p-3 md:col-span-2"
            onChange={handleChange}
          />

          <input
            name="screenshots"
            placeholder="Screenshot URLs (comma separated)"
            className="border rounded-lg p-3 md:col-span-2"
            onChange={handleChange}
          />

          <button
            className="bg-[#2b2b2b] text-white py-3 rounded-lg md:col-span-2"
          >
            Submit Project
          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default CreateSubmission;