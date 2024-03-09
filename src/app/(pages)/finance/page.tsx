"use client"

import TransactionSection from "@/app/_components/finance/recent-transactions-overview/TransactionSection"
import TransactionRow from "@/app/_components/finance/table/TransactionRow"
import TransactionTable from "@/app/_components/finance/table/TransactionTable"
import { useAppSelector } from "@/app/_redux/hooks"
import { RootState } from "@/app/_redux/store"
import { Card } from "@/app/types/interfaces"
import React from "react"

export default function FinancePage() {

  const card: Card = useAppSelector((state: RootState) => state.card.value)

  const transactionRowEl = card?.transactions?.map(transaction => <TransactionRow key={transaction.id} transaction={transaction} />)

  return (
    <div>
      <title>Organiser | Finance</title> 
      <div className="md:hidden">
        <TransactionSection/>
      </div>
      <div className="hidden md:block">
        <TransactionTable transactionRowEl={transactionRowEl}/>
      </div>
    </div>
  )
}
