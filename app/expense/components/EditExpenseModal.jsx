"use client";
import { useEffect, useState } from "react";

export default function EditExpenseModal({
  isOpen,
  expense,
  categories,
  onSave,
  onClose,
}) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!expense) return;

    setForm({
      title: expense.title,
      category: expense.category,
      price: String(expense.price),
    });

    setError("");
  }, [expense]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    if (!category) return setError("Category required");
    if (!Number.isFinite(priceNum) || priceNum <= 0)
      return setError("Invalid amount");

    onSave({
      ...expense,
      title,
      category,
      price: priceNum,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
      <div className="bg-white rounded-2xl p-5 w-[400px] space-y-3">
        <h3 className="font-semibold text-lg">Edit Expense</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-3 py-1 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-gray-900 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
