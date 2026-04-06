import { useState } from "react";
import Filters from "../components/Filters";
import TransactionHistory from "../components/TransactionHistory";

export default function TransactionPage({ onBack, role }) {
  const [filters, setFilters] = useState({ from: null, to: null, type: null, category: null, division: null });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <div className="flex gap-2">
          <button
            onClick={onBack}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back
          </button>
        </div>
      </div>

      <Filters onFilterChange={setFilters} />
      <TransactionHistory filters={filters} role={role} />
    </div>
  );
}
