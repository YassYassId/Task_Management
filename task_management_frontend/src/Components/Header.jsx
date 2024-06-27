import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Task Management</h1>
        <nav>
          <a href="/#about" className="ml-4 hover:underline">
            About Us
          </a>
          <a href="/#features" className="ml-4 hover:underline">
            Features
          </a>
          <a href="/signin" className="ml-4 hover:underline">
            Sign In
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
