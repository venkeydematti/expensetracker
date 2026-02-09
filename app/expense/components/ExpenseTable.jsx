export default function ExpenseTable({
    expenses,
    categories,
    filterCategory,
    setFilterCategory,
    sortDir,
    setSortDir,
    searchText,
    setSearchText,
    total,
    onDelete,
    onEdit,
  }) {
    const toggleSort = () => {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    };
  
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
        {/* Search + Filter */}
        <div className="flex flex-wrap gap-3">
          <input
            placeholder="Search by title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 min-w-[200px] border rounded-lg px-3 py-2"
          />
  
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {["all", ...categories].map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All" : cat}
              </option>
            ))}
          </select>
  
          <button
            onClick={toggleSort}
            className="border px-3 py-2 rounded-lg"
          >
            Sort {sortDir === "asc" ? "↑" : "↓"}
          </button>
        </div>
  
        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
  
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="border-b">
                <td className="py-2">{e.title}</td>
                <td>{e.category}</td>
                <td>₹{e.price}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => onEdit(e.id)}
                    className="border px-2 py-1 rounded"
                  >
                    Edit
                  </button>
  
                  <button
                    onClick={() => onDelete(e.id)}
                    className="border px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
  
            <tr>
              <th className="py-2">Total</th>
              <th></th>
              <th>₹{total}</th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  