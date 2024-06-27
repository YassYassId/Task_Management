import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

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
        "http://localhost:9090/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setMessage("Registration successful! Please sign in.");
    } catch (error) {
      setMessage("Error: Registration failed.");
    }
  };

  return (
    <section className="bg-blue-700 text-white py-12">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-2xl font-bold mb-4">
          Sign Up & Achieve Your Goals
        </h2>
        <form
          className="flex flex-col items-center text-black"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Your first name"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            className="mb-4 p-2 w-80 max-w-full rounded"
          />
          <input
            type="text"
            placeholder="Your last name"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="mb-4 p-2 w-80 max-w-full rounded"
          />
          <input
            type="email"
            placeholder="Your email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mb-4 p-2 w-80 max-w-full rounded"
          />
          <input
            type="password"
            placeholder="Pick a password"
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
            Sign Up
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-yellow-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpForm;
