import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";
import IncomeExpenseChart from "./IncomeExpenseChart";

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [filter, setFilter] = useState("month");

  const loadData = async () => {
    const res = await getTransactions();
    const data = res.data;

    const now = new Date();
    let inc = 0;
    let exp = 0;

    data.forEach((t) => {
      const d = new Date(t.createdAt);

      let valid = false;

      if (filter === "week") {
        // use explicit milliseconds difference
        valid = now.getTime() - d.getTime() <= 7 * 24 * 60 * 60 * 1000;
      }

      if (filter === "month") {
        // ensure same month and same year
        valid = d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }

      if (filter === "year") {
        valid = d.getFullYear() === now.getFullYear();
      }

      if (valid) {
        if (t.type === "income") inc += t.amount;
        if (t.type === "expense") exp += t.amount;
      }
    });

    setIncome(inc);
    setExpense(exp);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => {
    loadData();
  }, [filter]);

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Dashboard Overview</h2>
        <select
          className="border border-gray-300 p-2 rounded-md text-sm md:text-base"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-100 p-3 rounded">Income ₹{income}</div>
        <div className="bg-red-100 p-3 rounded">Expense ₹{expense}</div>
        <div className="bg-blue-100 p-3 rounded">
          Balance ₹{income - expense}
        </div>
      </div>

      <IncomeExpenseChart income={income} expense={expense} />
    </div>
  );
}
