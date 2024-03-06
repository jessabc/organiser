import { Transaction } from "@/app/types/interfaces"
import React from "react"

interface Props {
  category: string,
  transactions: Transaction[]
}

export default function CategoryCard({category, transactions}: Props) {

  let categoryTotal= transactions.reduce((acc, curr) => {
      return acc = curr.category === category ? acc + curr.amount : acc
  }, 0)
   
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] ">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {category}
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          $ {categoryTotal}
        </p>
      </div>
    </div>
  )
}
