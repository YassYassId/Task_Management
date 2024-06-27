import React from "react";
import mission from "../assets/Mission.webp";
import vision from "../assets/Vision.webp";
import values from "../assets/Values.webp";

const AboutUs = () => {
  return (
    <section id="about" className="py-12 bg-gray-100">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">About Us</h2>
        <div className="flex flex-wrap justify-around">
          <div className="about-item mb-8 w-80 bg-white p-6 rounded shadow-lg">
            <img
              src={mission}
              alt="Our Mission"
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">Our Mission</h3>
            <p className="mt-2 text-gray-700">
              To empower individuals and teams to achieve their goals
              efficiently and effectively through our innovative task management
              solutions.
            </p>
          </div>
          <div className="about-item mb-8 w-80 bg-white p-6 rounded shadow-lg">
            <img
              src={vision}
              alt="Our Vision"
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">Our Vision</h3>
            <p className="mt-2 text-gray-700">
              To become the leading task management platform that drives
              productivity and success for people around the world.
            </p>
          </div>
          <div className="about-item mb-8 w-80 bg-white p-6 rounded shadow-lg">
            <img
              src={values}
              alt="Our Values"
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">Our Values</h3>
            <p className="mt-2 text-gray-700">
              We believe in simplicity, efficiency, and user-centric design to
              create the best task management experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
