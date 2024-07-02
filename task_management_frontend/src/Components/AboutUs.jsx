import React from "react";
import mission from "../assets/Mission.webp";
import vision from "../assets/Vision.webp";
import values from "../assets/Values.webp";
import linkedinIcon from "../assets/linkedin-icon.png"; // Assume you have an icon for LinkedIn
import githubIcon from "../assets/github-icon.png"; // Assume you have an icon for GitHub
import twitterIcon from "../assets/twitter-icon.png"; // Assume you have an icon for Twitter

const AboutUs = () => {
  return (
    <section id="about" className="py-12 bg-gray-100">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">About Me</h2>
        <p className="mb-8 text-lg text-gray-700">
          This project was inspired by my personal need to improve productivity
          and task management. The idea originated from my experiences of
          managing projects and the desire to create a tool that simplifies task
          tracking, deadline management, and personal productivity. This project
          is part of my portfolio for Holberton School.
        </p>
        <div className="flex justify-center mb-8">
          <a
            href="https://www.linkedin.com/in/yassine-idrissi-337231255/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8" />
          </a>
          <a
            href="https://github.com/Yassid-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <img src={githubIcon} alt="GitHub" className="w-8 h-8" />
          </a>
          <a
            href="https://x.com/Yassine15100866"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <img src={twitterIcon} alt="Twitter" className="w-8 h-8" />
          </a>
        </div>
        <a
          href="https://github.com/Yassid-tech/Task_Management"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          View the project on GitHub
        </a>
        <div className="flex flex-wrap justify-around mt-12">
          <div className="about-item mb-8 w-80 bg-white p-6 rounded shadow-lg">
            <img
              src={mission}
              alt="My Mission"
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">My Mission</h3>
            <p className="mt-2 text-gray-700">
              To empower individuals to achieve their goals efficiently and
              effectively through innovative task management solutions.
            </p>
          </div>
          <div className="about-item mb-8 w-80 bg-white p-6 rounded shadow-lg">
            <img
              src={vision}
              alt="My Vision"
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">My Vision</h3>
            <p className="mt-2 text-gray-700">
              To become a leading task management tool that drives productivity
              and success for individuals around the world.
            </p>
          </div>
          <div className="about-item mb-8 w-80 bg-white p-6 rounded shadow-lg">
            <img
              src={values}
              alt="My Values"
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">My Values</h3>
            <p className="mt-2 text-gray-700">
              I believe in simplicity, efficiency, and user-centric design to
              create the best task management experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
