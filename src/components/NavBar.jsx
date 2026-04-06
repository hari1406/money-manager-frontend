import React from "react";

export default function NavBar({ current, onNavigate, role, onRoleChange }) {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <button
          onClick={() => onNavigate("home")}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
            current === "home" ? "bg-blue-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-blue-50"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => onNavigate("transactions")}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
            current === "transactions" ? "bg-blue-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-blue-50"
          }`}
        >
          Transactions
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="border border-blue-200 rounded-full px-3 py-1 text-sm font-medium bg-white"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
        <div className="text-xs md:text-sm text-indigo-600 font-semibold">Money Manager</div>
      </div>
    </nav>
  );
}
