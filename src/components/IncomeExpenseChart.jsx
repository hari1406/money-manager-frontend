// Chart.js temporarily disabled - pending npm installation
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend
// );

export default function IncomeExpenseChart({ income, expense }) {
  // Temporary fallback - will use chart.js once installed
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white">
      <h3 className="text-lg font-semibold mb-4">Income vs Expense</h3>
      <div className="flex justify-around items-end h-48">
        <div className="text-center">
          <div className="h-32 w-20 bg-green-400 rounded-t-lg relative">
            <span className="absolute -top-8 left-0 right-0 text-2xl font-bold text-green-400">
              ${income}
            </span>
          </div>
          <p className="mt-2 text-sm">Income</p>
        </div>
        <div className="text-center">
          <div className="h-24 w-20 bg-red-400 rounded-t-lg relative">
            <span className="absolute -top-8 left-0 right-0 text-2xl font-bold text-red-400">
              ${expense}
            </span>
          </div>
          <p className="mt-2 text-sm">Expense</p>
        </div>
      </div>
    </div>
  );
}
