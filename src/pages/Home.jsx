import { useState } from "react";
import DashboardPage from "./DashboardPage";
import AddTransactionModal from "../components/AddTransactionModal";

export default function Home({ role }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DashboardPage role={role} />

      {role === "admin" && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg"
        >
          + Add
        </button>
      )}

      {open && <AddTransactionModal close={() => setOpen(false)} />}
    </>
  );
}
