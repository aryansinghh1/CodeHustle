import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import api from "../../services/axios";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    college: "",
    bio: "",
    github: "",
    linkedin: "",
    skills: "",
    profileImage: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");

      setUser({
        ...res.data.user,
        skills: res.data.user.skills?.join(", ") || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/users/profile", {
        ...user,
        skills: user.skills
          .split(",")
          .map((item) => item.trim()),
      });

      toast.success("Profile Updated");
    } catch (err) {
      toast.error("Update Failed");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={user.email}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100"
          />

          <input
            name="college"
            value={user.college}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="College"
          />

          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            rows={4}
          />

          <input
            name="github"
            value={user.github}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="GitHub"
          />

          <input
            name="linkedin"
            value={user.linkedin}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="LinkedIn"
          />

          <input
            name="skills"
            value={user.skills}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="React, Node, MongoDB"
          />

          <button
            className="bg-[#2b2b2b] text-white px-6 py-3 rounded-lg"
          >
            Save Changes
          </button>

        </form>

      </div>
    </MainLayout>
  );
}

export default Profile;