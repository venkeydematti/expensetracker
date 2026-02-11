const isToday = (date) => {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  };
  
  const isThisWeek = (date) => {
    const d = new Date(date);
    const now = new Date();
    const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
    return d >= firstDay;
  };
  
  const isThisMonth = (date) => {
    const d = new Date(date);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  };
