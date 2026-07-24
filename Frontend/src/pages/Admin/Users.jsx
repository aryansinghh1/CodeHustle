import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";

import {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
} from "../../services/userService";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();

      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async (id) => {
    try {
      await blockUser(id);

      toast.success("User Blocked");

      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleUnblock = async (id) => {
    try {
      await unblockUser(id);

      toast.success("User Unblocked");

      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await deleteUser(id);

      toast.success("User Deleted");

      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Manage Users
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full bg-white rounded-xl shadow">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4">Name</th>

                <th>Email</th>

                <th>Role</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className="border-t text-center"
                >

                  <td className="p-4">
                    {user.name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {user.role}
                  </td>

                  <td>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </td>

                  <td className="space-x-2">

                    {user.isBlocked ? (

                      <button
                        onClick={() =>
                          handleUnblock(user._id)
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Unblock
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          handleBlock(user._id)
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Block
                      </button>

                    )}

                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

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