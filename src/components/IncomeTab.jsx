import { useState } from "react";
import { addTransaction } from "../services/api";

export default function IncomeTab() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    await addTransaction({
      type: "income",
      amount: Number(amount),
      description,
      category: "Salary",
      division: "personal",
    });

    alert("Income Added");
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Amount *</label>
        <input
          type="number"
          placeholder="Enter amount"
          required
          className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <input
          placeholder="Enter description"
          className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 mt-6">
        ✓ Add Income
      </button>
    </form>
  );
}
