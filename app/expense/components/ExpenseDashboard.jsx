"use client";
import { useState } from "react";
import useExpenseManager from "../hooks/useExpenseManager";
import SummaryCards from "./SummaryCards";
import ExpenseTable from "./ExpenseTable";
import AddExpensePanel from "./AddExpensePanel";
import EditExpenseModal from "./EditExpenseModal";




export default function ExpenseDashboard() {
  const manager = useExpenseManager();
  const [dateFilter, setDateFilter] = useState("all");
  if (!manager.mounted)
    return <div className="p-6">Loading dashboard...</div>;

  return (
    <>
    <section className="min-h-screen bg-gray-50 p-6 space-y-6">
    <header>
      <h1 className="text-3xl font-bold text-gray-800">
        Expense Dashboard
      </h1>
      <p className="text-gray-500">
        Manage and track your daily expenses efficiently
      </p>
    </header>

    <SummaryCards
      total={manager.total}
      count={manager.visibleExpenses.length}
      categories={manager.categories.length}
    />

    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <AddExpensePanel
          categories={manager.categories}
          onAdd={manager.addExpense}
        />
      </div>

      <div className="lg:col-span-2">
        <ExpenseTable
          expenses={manager.visibleExpenses}
          categories={manager.categories}
          filterCategory={manager.filterCategory}
          setFilterCategory={manager.setFilterCategory}
          sortDir={manager.sortDir}
          setSortDir={manager.setSortDir}
          searchText={manager.searchText}
          setSearchText={manager.setSearchText}
          total={manager.total}
          onDelete={manager.deleteExpense}
          onEdit={manager.setEditingId}
        />
      </div>
    </div>
    </section>
    <EditExpenseModal
      isOpen={Boolean(manager.editingExpense)}
      expense={manager.editingExpense}
      categories={manager.categories}
      onSave={manager.updateExpense}
      onClose={() => manager.setEditingId(null)} />
    </>
  );  
}
