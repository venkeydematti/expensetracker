"use client";
import { useEffect, useMemo, useState } from "react";
import categoriesData from "../../lib/categoriesData.js";
import expenseData from "../../lib/expenseData.js";

const EXPENSES_KEY = "expenses_v1";
const CATEGORIES_KEY = "categories_v1";

export default function useExpenseManager() {
  const [mounted, setMounted] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filterCategory, setFilterCategory] = useState("all");
  const [sortDir, setSortDir] = useState("asc");
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load from localStorage safely
  useEffect(() => {
    const savedExpenses = localStorage.getItem(EXPENSES_KEY);
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);

    setExpenses(savedExpenses ? JSON.parse(savedExpenses) : expenseData);
    setCategories(savedCategories ? JSON.parse(savedCategories) : categoriesData);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  }, [expenses, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories, mounted]);

  const visibleExpenses = useMemo(() => {
    const q = searchText.toLowerCase();

    return expenses
      .filter((e) => {
        const matchCategory =
          filterCategory === "all" || e.category === filterCategory;
        const matchSearch = e.title.toLowerCase().includes(q);
        return matchCategory && matchSearch;
      })
      .sort((a, b) =>
        sortDir === "asc" ? a.price - b.price : b.price - a.price
      );
  }, [expenses, filterCategory, sortDir, searchText]);

  const total = useMemo(
    () => visibleExpenses.reduce((sum, e) => sum + e.price, 0),
    [visibleExpenses]
  );

  const addExpense = ({ title, category, price }) => {
    setExpenses((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, category, price },
    ]);

    setCategories((prev) =>
      prev.includes(category) ? prev : [...prev, category]
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExpense = (updated) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  };

  return {
    mounted,
    expenses,
    categories,
    visibleExpenses,
    total,
    filterCategory,
    setFilterCategory,
    sortDir,
    setSortDir,
    searchText,
    setSearchText,
    editingId,
    setEditingId,
    addExpense,
    deleteExpense,
    updateExpense,
  };
}
