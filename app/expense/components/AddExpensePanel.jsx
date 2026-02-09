"use client";
import { useState } from "react";

export default function AddExpensePanel({ categories, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
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
    const priceNum = Number(form.price);

    if (!title) return setError("Title required");
    if (!category) return setError("Select category");
    if (!Number.isFinite(priceNum) || priceNum <= 0)
      return setError("Invalid amount");

    onAdd({ title, category, price: priceNum });

    setForm({
      title: "",
      category: "",
      price: "",
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
          name="price"
          placeholder="Amount"
          value={form.price}
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
