export const formatCurrency = (amount: number) => {
  if (!amount) return "0 $";
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};
