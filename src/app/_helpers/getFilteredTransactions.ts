import { Card } from "../types/interfaces";

export default function getFilteredTransactions(
  card: Card,
  filterQuery: string | null,
  sortQuery: string
) {
  let filteredTransactions = card.transactions;

  if (filterQuery) {
    filteredTransactions = card.transactions.filter(
      (transaction) =>
        transaction.type == filterQuery || transaction.category == filterQuery
    );
  }

  if (sortQuery && filteredTransactions) {
    if (sortQuery === "ascending") {
      // @ts-ignore
      filteredTransactions = [...filteredTransactions].sort(
        // @ts-ignore
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } else if (sortQuery === "descending") {
      // @ts-ignore
      filteredTransactions = [...filteredTransactions].sort(
        // @ts-ignore
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }
  }

  return filteredTransactions;
}
