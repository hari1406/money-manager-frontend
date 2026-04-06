import { useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import TransactionPage from "./pages/TransactionPage";

export default function App() {
  const [route, setRoute] = useState("home");
  const [role, setRole] = useState("viewer"); // default to viewer

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <NavBar current={route} onNavigate={setRoute} role={role} onRoleChange={setRole} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-4 md:p-6">
          {route === "home" && <Home role={role} />}
          {route === "transactions" && (
            <TransactionPage onBack={() => setRoute("home")} role={role} />
          )}
        </div>
      </div>
    </div>
  );
}
