import React from "react";
import SignUpForm from "./SignUpForm";
import AboutUs from "./AboutUs";
import Features from "./Features";

const LandingPage = () => {
  return (
    <div>
      <section className="bg-blue-700 text-white py-6 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">
              We help you achieve your goals properly
            </h1>
            <p className="text-xl mb-6">
              Manage your tasks efficiently and collaborate with your team
              seamlessly!
              <br />
              Our task management application allows you to keep track of all
              your tasks, set deadlines, and ensure that nothing slips through
              the cracks. Whether you are working alone or as part of a team,
              our tool is designed to help you stay organized and focused.
            </p>
            <ul className="list-disc list-inside text-pretty">
              <li className="mb-2">Create and manage tasks with ease</li>
              <li className="mb-2">
                Collaborate with team members in real-time
              </li>
              <li className="mb-2">
                Visualize your progress with our calendar view
              </li>
              <li className="mb-2">
                Get notifications and reminders for upcoming deadlines
              </li>
            </ul>
          </div>
          {/* Add a border here */}
          <div className="md:w-1/2">
            <SignUpForm />
          </div>
        </div>
      </section>
      <AboutUs />
      <Features />
    </div>
  );
};

export default LandingPage;
