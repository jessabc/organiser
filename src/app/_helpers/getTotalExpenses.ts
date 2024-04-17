import { Card } from "../types/interfaces";

export default function getTotalExpenses(card: Card) {
  const incomeTransactions = card.transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const total = incomeTransactions.reduce((acc, curr) => {
    return (acc = acc + curr.amount);
  }, 0);
  return total;
}
