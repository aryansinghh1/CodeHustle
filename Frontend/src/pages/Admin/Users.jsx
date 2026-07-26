import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBan, FaCheckCircle, FaTrash } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getAllUsers, blockUser, unblockUser, deleteUser } from "../../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try { const res = await getAllUsers(); setUsers(res.data.users); }
    catch (err) { console.log(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleBlock = async (id) => {
    try { await blockUser(id); toast.success("User Blocked"); fetchUsers(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };
  const handleUnblock = async (id) => {
    try { await unblockUser(id); toast.success("User Unblocked"); fetchUsers(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    try { await deleteUser(id); toast.success("User Deleted"); fetchUsers(); }
    catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  if (loading) return <MainLayout><Loader text="Loading users..." /></MainLayout>;

  return (
    <MainLayout>
      <div className="container section-spacing">
        <div className="page-header">
          <h1>Manage Users</h1>
          <div className="accent-bar" />
          <p>View, block, and manage all platform users</p>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="font-bold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge badge-purple">{user.role}</span>
                  </td>
                  <td>
                    <span className={`badge ${user.isBlocked ? "badge-red" : "badge-green"}`}>
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {user.isBlocked ? (
                        <button onClick={() => handleUnblock(user._id)} className="success-btn">
                          <FaCheckCircle size={10} /> Unblock
                        </button>
                      ) : (
                        <button onClick={() => handleBlock(user._id)} className="outline-btn" style={{ padding: "6px 12px", fontSize: 12, color: "var(--warning)", borderColor: "var(--warning)" }}>
                          <FaBan size={10} /> Block
                        </button>
                      )}
                      <button onClick={() => handleDelete(user._id)} className="danger-btn">
                        <FaTrash size={10} /> Delete
                      </button>
                    </div>
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

export default Users;