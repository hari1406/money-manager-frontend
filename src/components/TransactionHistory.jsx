import { useEffect, useState } from "react";
import { getTransactions, updateTransaction } from "../services/api";
import { formatDate } from "../utils/dateUtils";

export default function TransactionHistory({ filters, role }) {
  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [amount, setAmount] = useState("");

  const loadTransactions = async () => {
    try {
      // Build query parameters
      const params = {};
      if (filters?.from) {
        params.start = filters.from;
      }
      if (filters?.to) {
        params.end = filters.to;
      }

      const res = await getTransactions(params);
      setTransactions(res.data);
    } catch {
      console.error("Error loading transactions");
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [filters]);

  const canEdit = (createdAt) => {
    // eslint-disable-next-line react-hooks/purity
    const diff = Date.now() - new Date(createdAt).getTime();
    return diff <= 12 * 60 * 60 * 1000;
  };

  const saveEdit = async (id) => {
    try {
      await updateTransaction(id, { amount });
      alert("Updated");
      setEditId(null);
      loadTransactions();
    } catch {
      alert("Edit time expired (12 hours)");
    }
  };

  const filterTransactions = () => {
    let filtered = transactions;

    // Filter by date range
    if (filters?.from || filters?.to) {
      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.createdAt);
        const fromDate = filters?.from ? new Date(filters.from) : null;
        const toDate = filters?.to ? new Date(filters.to) : null;

        // Add one day to toDate to include the entire day
        if (toDate) {
          toDate.setDate(toDate.getDate() + 1);
        }

        let valid = true;

        if (fromDate && transactionDate < fromDate) {
          valid = false;
        }

        if (toDate && transactionDate >= toDate) {
          valid = false;
        }

        return valid;
      });
    }

    // Filter by transaction type (income/expense)
    if (filters?.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    // Filter by category
    if (filters?.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    // Filter by division
    if (filters?.division) {
      filtered = filtered.filter((t) => t.division === filters.division);
    }

    return filtered;
  };

  const filteredTransactions = filterTransactions();

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 my-6">
      <h2 className="font-bold text-xl md:text-2xl mb-4 flex items-center gap-3">
        Transaction History
        {filters?.type && (
          <span className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold ${filters.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {filters.type.charAt(0).toUpperCase() + filters.type.slice(1)} Only
          </span>
        )}
      </h2>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No transactions found</p>
      ) : (
        filteredTransactions.map((t) => (
          <div
            key={t._id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 border-b py-3 hover:bg-slate-50 px-3 transition-all"
          >
            <div className="flex flex-col">
              <p className="font-semibold text-gray-800 text-base md:text-lg">{t.category}</p>
              <p className="text-xs md:text-sm text-gray-500">{formatDate(t.createdAt)}</p>
            </div>

            {editId === t._id ? (
              <>
                <input
                  type="number"
                  className="border-2 border-blue-500 w-24 px-2 py-1 rounded"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={t.amount}
                />
                <button
                  className="text-green-600 font-semibold hover:text-green-800 ml-3"
                  onClick={() => saveEdit(t._id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  className={`font-bold text-lg md:text-xl ${
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}₹{t.amount}
                </span>

                {role === "admin" && canEdit(t.createdAt) && (
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm md:text-base font-semibold transition-all"
                    onClick={() => setEditId(t._id)}
                  >
                    Edit
                  </button>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
