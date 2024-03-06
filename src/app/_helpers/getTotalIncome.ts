import { Card } from "../types/interfaces"

export default function getTotalIncome(card: Card) {
  const incomeTransactions = card.transactions.filter(transaction => transaction.type === "income")
  const total = incomeTransactions.reduce((acc, curr) => {
    return  acc = acc + curr.amount
  }, 0)
  return total 
} 