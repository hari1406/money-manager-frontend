import { useState } from "react";
import { addTransaction } from "../services/api";

export default function ExpenseTab() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [division, setDivision] = useState("personal");

  const submitHandler = async (e) => {
    e.preventDefault();

    await addTransaction({
      type: "expense",
      amount: Number(amount),
      category,
      division,
    });

    alert("Expense Added");
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Amount *</label>
        <input
          type="number"
          placeholder="Enter amount"
          required
          className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
        <select
          required
          className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all cursor-pointer"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Fuel</option>
          <option>Medical</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Division *</label>
        <select
          required
          className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all cursor-pointer"
          onChange={(e) => setDivision(e.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="office">Office</option>
        </select>
      </div>
      <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 mt-6">
        ✓ Add Expense
      </button>
    </form>
  );
}
