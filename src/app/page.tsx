"use client"

import { useEffect } from "react";
import Card from "./_components/finance/card/Card";
import IncomeExpenseCard from "./_components/finance/income-expense-card/IncomeExpenseCard";
import TransactionSection from "./_components/finance/recent-transactions-overview/TransactionSection";
import ProjectsSection from "./_components/projects/current-projects-overview/ProjectsSection";
import { useAppDispatch, useAppSelector } from "./_redux/hooks";
import { setAllBoards } from "./_redux/features/boards/boardsSlice";
import getBoards from "./_helpers/getBoards";
import { setAllTransactions, setCard, updateAmount, updateCategories } from "./_redux/features/card/cardSlice";
import getCard from "./_helpers/getCard";
import { RootState } from "./_redux/store";

export default function Home() {

  const boards = useAppSelector((state: RootState) => state.boards.value)
  const dispatch = useAppDispatch()
  
  const incomeExpenseCardEl = ["Income", "Expense"].map(item => <IncomeExpenseCard key={item} type={item} />)

  useEffect(() => {
    async function getInitialBoards() {
      const initialBoards = await getBoards()
      dispatch(setAllBoards(initialBoards))
    }

    async function getInitialCard() {
      const card = await getCard()
      dispatch(setCard(card))
      dispatch(updateAmount(card.amount))
      dispatch(updateCategories(card.categories))
      dispatch(setAllTransactions(card.transactions))
    }
   
    if(boards.length === 0) {
      getInitialBoards()
      getInitialCard()
    }
  }, [boards.length, dispatch])

  return (
    <>     
      <div>
        <div className="flex flex-col gap-5 md:grid grid-cols-3 mb-10">
          <Card/>
          {incomeExpenseCardEl}
        </div>
        <div className="md:grid grid-cols-2 gap-7 lg:-mt-10">
          <TransactionSection/>
          <ProjectsSection/>
        </div>
      </div>
    </>
  );
}
