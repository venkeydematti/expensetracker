const today = new Date().toISOString().split("T")[0];

export default [
  {
    id: crypto.randomUUID(),
    title: "Milk",
    category: "Grocery",
    amount: 400,
    date: today,
    createdAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    title: "Cloths",
    category: "Fashion",
    amount: 1000,
    date: today,
    createdAt: Date.now(),
  },
];
