import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const name = localStorage.getItem("username");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">Todo App</span>
        </div>

        {/* Right side: Username and Logout */}
        <div className="flex items-center space-x-4">
          <span className="text-sm sm:text-base font-medium">{name}</span>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
