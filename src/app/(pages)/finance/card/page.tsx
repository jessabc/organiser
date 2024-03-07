"use client"

import React from "react"
import Card from "@/app/_components/finance/card/Card"
import CategorySection from "@/app/_components/finance/category-overview/CategorySection"
import IncomeExpenseCard from "@/app/_components/finance/income-expense-card/IncomeExpenseCard"
import TransactionSection from "@/app/_components/finance/recent-transactions-overview/TransactionSection"

export default function CardPage() {

  const incomeExpenseCardEl = ["Income", "Expense"].map(item => <IncomeExpenseCard key={item} type={item} />)

  return (
    <div>
      <div className="flex flex-col gap-5 md:grid grid-cols-3">
        <Card/>
        {incomeExpenseCardEl}
      </div>
      <div className="md:grid grid-cols-2 gap-7">
        <CategorySection/>
        <TransactionSection/>
      </div>
    </div>
  )
}
