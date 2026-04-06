import { useState } from "react";
import IncomeTab from "./IncomeTab";
import ExpenseTab from "./ExpenseTab";

export default function AddTransactionModal({ close }) {
  const [tab, setTab] = useState("income");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-3 sm:p-6">
      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header with Tabs */}
        <div className="flex border-b-2 border-gray-200">
          <button
            onClick={() => setTab("income")}
            className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-all duration-300 ${
              tab === "income"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-150"
            }`}
          >
            💰 Income
          </button>
          <button
            onClick={() => setTab("expense")}
            className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-all duration-300 ${
              tab === "expense"
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-150"
            }`}
          >
            💸 Expense
          </button>
        </div>

        {/* Content */}
        <div className="p-8 bg-white">
          {tab === "income" ? <IncomeTab /> : <ExpenseTab />}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-4">
          <button
            onClick={close}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            ✕ Close
          </button>
        </div>
      </div>
    </div>
  );
}
