export default function SummaryCards({ total, count, categories }) {
    const cards = [
      { title: "Total Expenses", value: `₹${total}` },
      { title: "Transactions", value: count },
      { title: "Categories", value: categories },
    ];
  
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"
          >
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-1">
              {card.value}
            </h3>
          </div>
        ))}
      </div>
    );
  }
  