import React from "react";
import EditTransactionModal from "./modals/TransactionModal";
import DeleteTransactionModal from "./modals/DeleteTransactionModal";
import { ITransaction } from "@/app/types/interfaces";

interface Props {
  transaction: ITransaction;
}

export default function Transaction({ transaction }: Props) {
  const editModalProps = {
    openButtonText: "edit",
    header: "edit transaction",
    thisTransaction: transaction,
  };

  return (
    <>
      <div className="flex items-center justify-between h-20 bg-opacity-40  p-2 bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="w-1/4 flex justify-center items-center">
          <div
            className={`${
              transaction.type === "income"
                ? "bg-green-200 dark:bg-green-400"
                : "bg-red-200 dark:bg-red-400"
            } rounded-full p-2`}
          >
            {transaction.type === "income" ? (
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
        </div>

        <div className="flex flex-col text-left w-1/4">
          <p className="font-bold">{transaction.category}</p>
          <p className="text-sm"> {transaction.notes}</p>
        </div>

        <div className="flex flex-col text-right w-1/4 ">
          <p
            className={`${
              transaction.type === "income" ? "text-green-400" : "text-red-400"
            } font-bold text-lg text-right`}
          >
            {transaction.type === "income"
              ? transaction.amount
              : `-${transaction.amount} `}
          </p>
          <p className="text-xs">
            {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-2 w-1/4 justify-end mr-5">
          <EditTransactionModal
            modalProps={editModalProps}
            thisTransaction={transaction}
          />
          <DeleteTransactionModal thisTransaction={transaction} />
        </div>
      </div>
    </>
  );
}
