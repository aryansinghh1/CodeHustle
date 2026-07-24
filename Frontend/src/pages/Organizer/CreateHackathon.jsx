import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import { createHackathon } from "../../services/hackathonService";

function CreateHackathon() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    theme: "",
    mode: "Online",
    venue: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    bannerImage: "",
    prizePool: "",
    maxTeamSize: "",
    rules: "",
    judgingCriteria: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        maxTeamSize: Number(formData.maxTeamSize),
        rules: formData.rules
          .split(",")
          .map((rule) => rule.trim())
          .filter(Boolean),
        judgingCriteria: formData.judgingCriteria
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await createHackathon(payload);

      toast.success("Hackathon Created Successfully");

      navigate("/organizer/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create hackathon"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Create Hackathon
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="theme"
            placeholder="Theme"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
            rows={4}
            required
          />

          <select
            name="mode"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Online</option>
            <option>Offline</option>
          </select>

          <input
            name="venue"
            placeholder="Venue"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="registrationDeadline"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="bannerImage"
            placeholder="Banner Image URL"
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <input
            name="prizePool"
            placeholder="Prize Pool"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="maxTeamSize"
            placeholder="Maximum Team Size"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <textarea
            name="rules"
            placeholder="Rules (comma separated)"
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
            rows={3}
          />

          <textarea
            name="judgingCriteria"
            placeholder="Judging Criteria (comma separated)"
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
            rows={3}
          />

          <button
            disabled={loading}
            className="bg-[#2b2b2b] text-white py-3 rounded-lg md:col-span-2"
          >
            {loading ? "Creating..." : "Create Hackathon"}
          </button>

        </form>

      </div>
    </MainLayout>
  );
}

export default CreateHackathon;