import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import { createUser } from "../../services/userService";

function CreateUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "organizer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(formData);

      toast.success(`${formData.role} created successfully`);

      navigate("/admin/users");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create user"
      );
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Create User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full border rounded-lg p-3"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="organizer">Organizer</option>
            <option value="judge">Judge</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full bg-[#2b2b2b] text-white py-3 rounded-lg">
            Create User
          </button>

        </form>
      </div>
    </MainLayout>
  );
}

export default CreateUser;