import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import { createUser } from "../../services/userService";
import "./CreateUser.css";

function CreateUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "organizer",
  });

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      toast.success(`${formData.role} created successfully`);
      navigate("/admin/users");
    } catch (err) { toast.error(err.response?.data?.message || "Failed to create user"); }
  };

  return (
    <MainLayout>
      <div className="container section-spacing create-user-container">
        <div className="page-header text-center">
          <h1>Create User</h1>
          <div className="accent-bar create-user-accent-bar" />
          <p>Add a new organizer, judge, or admin</p>
        </div>

        <div className="form-card">
          <div className="empty-icon create-user-icon">
            <FaUserPlus />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input name="name" placeholder="John Doe" className="input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" placeholder="user@example.com" className="input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" name="password" placeholder="••••••••" className="input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select name="role" className="input" value={formData.role} onChange={handleChange}>
                <option value="organizer">Organizer</option>
                <option value="judge">Judge</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="primary-btn create-user-submit-btn">Create User</button>
          </form>
        </div>
        
      </div>
    </MainLayout>
  );
}

export default CreateUser;