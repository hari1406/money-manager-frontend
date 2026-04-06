import axios from "axios";

const API = axios.create({
  baseURL: "https://money-manager-backend-8e6u.onrender.com/api", // change after deployment
});

// Transactions
export const addTransaction = (data) =>
  API.post("/transactions", data);

export const getTransactions = (params) =>
  API.get("/transactions", { params });

export const updateTransaction = (id, data) =>
  API.put(`/transactions/${id}`, data);

// Accounts
export const getAccounts = () =>
  API.get("/accounts");

export const transferAmount = (data) =>
  API.post("/accounts/transfer", data);

// Reports
export const getCategorySummary = () =>
  API.get("/reports/category-summary");

export const getTimeReport = (start, end) =>
  API.get("/reports/time-report", {
    params: { start, end },
  });
