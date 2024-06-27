import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data);
        setFormData({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:9090/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUser(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:9090/api/auth/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error("Error changing password", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/6 bg-gray-200 p-4">
        <nav>
          <ul>
            <li className="mb-4">
              <Link
                to="/tasks"
                className={`block w-full text-left py-2 px-3 rounded ${
                  location.pathname === "/tasks"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-black"
                }`}
              >
                My Tasks
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/calendar"
                className={`block w-full text-left py-2 px-3 rounded ${
                  location.pathname === "/calendar"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-black"
                }`}
              >
                Calendar
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/profile"
                className={`block w-full text-left py-2 px-3 rounded ${
                  location.pathname === "/profile"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-black"
                }`}
              >
                Profile
              </Link>
            </li>
            <li className="mt-4">
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-3 rounded bg-red-600 text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-6 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow h-full">
          <h2 className="text-3xl font-bold mb-6">Profile</h2>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-left mb-1 text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="p-3 w-full rounded border border-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left mb-1 text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="p-3 w-full rounded border border-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left mb-1 text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 w-full rounded border border-gray-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <p className="mb-4">
                <strong className="text-gray-700">First Name:</strong>{" "}
                {user.prenom}
              </p>
              <p className="mb-4">
                <strong className="text-gray-700">Last Name:</strong> {user.nom}
              </p>
              <p className="mb-4">
                <strong className="text-gray-700">Email:</strong> {user.email}
              </p>
              <p className="mb-4">
                <strong className="text-gray-700">Role:</strong> {user.role}
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800"
              >
                Edit Profile
              </button>
            </div>
          )}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Change Password</h3>
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label className="block text-left mb-1 text-gray-600">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="p-3 w-full rounded border border-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left mb-1 text-gray-600">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="p-3 w-full rounded border border-gray-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
