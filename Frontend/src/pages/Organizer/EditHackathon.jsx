import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import {
  getHackathonById,
  updateHackathon,
} from "../../services/hackathonService";

function EditHackathon() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchHackathon();
  }, []);

  const fetchHackathon = async () => {
    try {
      const res = await getHackathonById(id);

      const hackathon = res.data.hackathon;

      setFormData({
        title: hackathon.title,
        description: hackathon.description,
        theme: hackathon.theme,
        mode: hackathon.mode,
        venue: hackathon.venue,
        startDate: hackathon.startDate.slice(0, 10),
        endDate: hackathon.endDate.slice(0, 10),
        registrationDeadline:
          hackathon.registrationDeadline.slice(0, 10),
        bannerImage: hackathon.bannerImage,
        prizePool: hackathon.prizePool,
        maxTeamSize: hackathon.maxTeamSize,
        rules: hackathon.rules.join(", "),
        judgingCriteria:
          hackathon.judgingCriteria.join(", "),
      });
    } catch (err) {
      toast.error("Unable to load hackathon");
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
      await updateHackathon(id, {
        ...formData,
        maxTeamSize: Number(formData.maxTeamSize),
        rules: formData.rules
          .split(",")
          .map((item) => item.trim()),
        judgingCriteria: formData.judgingCriteria
          .split(",")
          .map((item) => item.trim()),
      });

      toast.success("Hackathon Updated");

      navigate("/organizer/my-hackathons");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Update Failed"
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
      <div className="max-w-4xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Edit Hackathon
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Online</option>
            <option>Offline</option>
          </select>

          <input
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="registrationDeadline"
            value={formData.registrationDeadline}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="bannerImage"
            value={formData.bannerImage}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <input
            name="prizePool"
            value={formData.prizePool}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="maxTeamSize"
            value={formData.maxTeamSize}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <textarea
            rows={3}
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <textarea
            rows={3}
            name="judgingCriteria"
            value={formData.judgingCriteria}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button className="bg-[#2b2b2b] text-white py-3 rounded-lg md:col-span-2">
            Update Hackathon
          </button>

        </form>

      </div>
    </MainLayout>
  );
}

export default EditHackathon;