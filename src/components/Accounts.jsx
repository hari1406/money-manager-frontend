import { useEffect, useState } from "react";
import { getAccounts } from "../services/api";

function formatCurrency(val) {
  if (val === null || val === undefined || Number.isNaN(Number(val))) return "-";
  return "₹" + Number(val).toLocaleString("en-IN");
}

export default function Accounts({ role }) {
  const [cash, setCash] = useState(3000);
  const [bank, setBank] = useState(7000);

  const [editing, setEditing] = useState({ cash: false, bank: false });
  const [temp, setTemp] = useState({ cash: "", bank: "" });

  useEffect(() => {
    // try to load real accounts from API if available
    (async () => {
      try {
        const res = await getAccounts();
        // expecting res.data to be an object like { cash: 3000, bank: 7000 }
        if (res && res.data) {
          const data = res.data;
          if (data.cash !== undefined) setCash(Number(data.cash));
          if (data.bank !== undefined) setBank(Number(data.bank));
        }
      } catch {
        // ignore, keep defaults
      }
    })();
  }, []);

  const startEdit = (field) => {
    setTemp((s) => ({ ...s, [field]: field === "cash" ? cash : bank }));
    setEditing((e) => ({ ...e, [field]: true }));
  };

  const cancelEdit = (field) => {
    setEditing((e) => ({ ...e, [field]: false }));
    setTemp((s) => ({ ...s, [field]: "" }));
  };

  const saveEdit = (field) => {
    const value = Number(temp[field]);
    if (Number.isNaN(value)) {
      alert("Please enter a valid number");
      return;
    }

    if (field === "cash") setCash(value);
    if (field === "bank") setBank(value);

    setEditing((e) => ({ ...e, [field]: false }));
    setTemp((s) => ({ ...s, [field]: "" }));
    alert("Account updated");
  };

  return (
    <div className="bg-white p-4 rounded">
      <h2 className="font-bold mb-4 pl-9">Accounts</h2>

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-gray-600">Cash</p>
          {!editing.cash ? (
            <p className="font-semibold text-lg">{formatCurrency(cash)}</p>
          ) : (
            <input
              type="number"
              className="border p-2 rounded"
              value={temp.cash}
              onChange={(e) => setTemp((s) => ({ ...s, cash: e.target.value }))}
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          {role === "admin" && !editing.cash ? (
            <button className="bg-blue-500 text-white px-3 py-1 rounded m-0" onClick={() => startEdit("cash")}>Edit</button>
          ) : role === "admin" && editing.cash ? (
            <>
              <button className="bg-green-500 text-white px-3 py-1 rounded m-0" onClick={() => saveEdit("cash")}>Save</button>
              <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded m-0" onClick={() => cancelEdit("cash")}>Cancel</button>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Bank</p>
          {!editing.bank ? (
            <p className="font-semibold text-lg">{formatCurrency(bank)}</p>
          ) : (
            <input
              type="number"
              className="border p-2 rounded"
              value={temp.bank}
              onChange={(e) => setTemp((s) => ({ ...s, bank: e.target.value }))}
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          {role === "admin" && !editing.bank ? (
            <button className="bg-blue-500 text-white px-3 py-1 rounded m-0" onClick={() => startEdit("bank")}>Edit</button>
          ) : role === "admin" && editing.bank ? (
            <>
              <button className="bg-green-500 text-white px-3 py-1 rounded m-0" onClick={() => saveEdit("bank")}>Save</button>
              <button className="bg-gray-300 text-gray-800 px-3 py-1 rounded m-0" onClick={() => cancelEdit("bank")}>Cancel</button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
