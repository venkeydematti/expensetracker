"use client";
import { useState } from "react";

export default function AddExpensePanel({ categories, onAdd }) {

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    date: today,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = form.title.trim();
    const category = form.category.trim();
    const amountNum = Number(form.amount);

    if (!title) return setError("Title required");
    if (!category) return setError("Select category");
    if (!form.date) return setError("Select date");
    
    if (!Number.isFinite(amountNum) || amountNum <= 0)
      return setError("Invalid amount");

    onAdd({
      title,
      category,
      amount: amountNum,
      date: new Date(form.date).toISOString(),
    });
    

    setForm({
      title: "",
      category: "",
      amount: "",
      date: today,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <h3 className="font-semibold mb-3">Add Expense</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          type="number"
          min="0"
          step="0.01"
          required
          inputMode="decimal"
          pattern="\d+(\.\d{1,2})?"
          title="Please enter a valid amount (e.g. 10.50)"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "amount-error" : undefined}
        />

        <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

        {error && (
          <div className="text-sm text-red-500">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-lg cursor-pointer"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
