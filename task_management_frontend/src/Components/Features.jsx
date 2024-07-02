import React from "react";
import feature1 from "../assets/Feature1.webp";
import feature2 from "../assets/Feature2.webp";

const Features = () => {
  return (
    <section id="features" className="py-12 bg-white">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">Features</h2>
        <div className="flex flex-wrap justify-around">
          <div className="feature-item mb-8 w-96 bg-gray-100 p-6 rounded shadow-lg">
            <img
              src={feature1}
              alt="Feature 1"
              className="w-full h-56 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">Managing</h3>
            <p className="mt-2 text-gray-700">
              Manage your tasks efficiently with our easy-to-use interface.
            </p>
          </div>
          <div className="feature-item mb-8 w-96 bg-gray-100 p-6 rounded shadow-lg">
            <img
              src={feature2}
              alt="Feature 2"
              className="w-full h-56 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">Tracking</h3>
            <p className="mt-2 text-gray-700">
              Track your progress and achieve your goals with detailed
              analytics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
