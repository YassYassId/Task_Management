import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9090/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_email", formData.email);
      setMessage("Login successful!");
      navigate("/tasks"); // Redirect to the tasks page after login
    } catch (error) {
      setMessage("Error: Login failed.");
    }
  };

  return (
    <section className="bg-blue-700 text-white py-12">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form
          className="flex flex-col items-center text-black"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mb-4 p-2 w-80 max-w-full rounded"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mb-4 p-2 w-80 max-w-full rounded"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-blue-900 py-2 px-6 rounded hover:bg-yellow-500"
          >
            Sign In
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
        <p className="mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </section>
  );
};

export default SignInForm;
