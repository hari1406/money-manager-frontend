import { useEffect, useState } from "react";
import { getCategorySummary } from "../services/api";

export default function Summary() {
  const [summary, setSummary] = useState([]);

  const loadSummary = async () => {
    const res = await getCategorySummary();
    setSummary(res.data);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="font-bold text-lg md:text-xl mb-3">Category Summary</h2>

      <div className="space-y-1">
        {summary.map((s) => (
          <p key={s._id} className="text-sm md:text-base text-gray-700">
            {s._id}: <span className="font-semibold text-indigo-700">₹{s.total}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
