import getTotalExpenses from "@/app/_helpers/getTotalExpenses";
import getTotalIncome from "@/app/_helpers/getTotalIncome";
import { useAppSelector } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import React from "react";

interface Props {
  type: string;
}

export default function IncomeExpenseCard({ type }: Props) {
  const card = useAppSelector((state: RootState) => state.card.value);

  return (
    <div className="flex  bg-white border shadow-sm rounded-xl h-40 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]  justify-center items-center px-5">
      <div
        className={`${
          type === "Income" ? "bg-green-300" : "bg-red-300"
        } rounded-full p-2`}
      >
        {type === "Income" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trending-up"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 17l6 -6l4 4l8 -8" />
            <path d="M14 7l7 0l0 7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trending-down"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7l6 6l4 -4l8 8" />
            <path d="M21 10l0 7l-7 0" />
          </svg>
        )}
      </div>
      <div className="p-4 md:p-5">
        <h3
          className={`${
            type === "Income" ? "text-green-400" : "text-red-400"
          } font-bold text-lg`}
        >
          {type === "Income" ? "Income" : "Expenses"}
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          $ {type === "Income" ? getTotalIncome(card) : getTotalExpenses(card)}
        </p>
      </div>
    </div>
  );
}
