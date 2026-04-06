import { useState } from "react";

export default function Filters({ onFilterChange }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [division, setDivision] = useState("");
  const [type, setType] = useState(null);

  const emitChange = (changes) => {
    // Merge current local state with changes and notify parent
    const payload = {
      from: changes.from !== undefined ? changes.from : fromDate || null,
      to: changes.to !== undefined ? changes.to : toDate || null,
      type: changes.type !== undefined ? changes.type : type || null,
      category: changes.category !== undefined ? changes.category : (category === "All Categories" ? null : category),
      division: changes.division !== undefined ? changes.division : (division === "" ? null : division),
    };

    if (onFilterChange) onFilterChange(payload);
  };

  const handleFromDateChange = (e) => {
    const date = e.target.value;
    setFromDate(date);
    emitChange({ from: date });
  };

  const handleToDateChange = (e) => {
    const date = e.target.value;
    setToDate(date);
    emitChange({ to: date });
  };

  const handleTypeChange = (selectedType) => {
    const newType = type === selectedType ? null : selectedType;
    setType(newType);
    emitChange({ type: newType });
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory(val);
    const cat = val === "All Categories" ? null : val;
    emitChange({ category: cat });
  };

  const handleDivisionChange = (e) => {
    const val = e.target.value;
    setDivision(val);
    const div = val === "" ? null : val;
    emitChange({ division: div });
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setCategory("All Categories");
    setDivision("");
    setType(null);
    emitChange({ from: null, to: null, type: null, category: null, division: null });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <div className="flex gap-4 items-end flex-wrap">
        {/* Transaction Type Buttons */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleTypeChange("income")}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                type === "income"
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              💰 Income
            </button>
            <button
              onClick={() => handleTypeChange("expense")}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                type === "expense"
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              💸 Expense
            </button>
          </div>
        </div>

        <div className="my-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <select 
            className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            value={category}
            onChange={handleCategoryChange}
          >
            <option>All Categories</option>
            <option>Food</option>
            <option>Fuel</option>
            <option>Medical</option>
            <option>Salary</option>
          </select>
        </div>

        <div className="my-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Division</label>
          <select 
            className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            value={division}
            onChange={handleDivisionChange}
          >
            <option value="">All Divisions</option>
            <option value="personal">Personal</option>
            <option value="office">Office</option>
          </select>
        </div>

        <div className="my-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">From Date</label>
          <input 
            type="date" 
            className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </div>

        <div className="my-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">To Date</label>
          <input 
            type="date" 
            className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            value={toDate}
            onChange={handleToDateChange}
          />
        </div>

        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-all"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
