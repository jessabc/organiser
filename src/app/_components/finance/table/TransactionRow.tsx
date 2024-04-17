import React from "react";
import DeleteTransactionModal from "../modals/DeleteTransactionModal";
import EditTransactionModal from "../modals/TransactionModal";
import { ITransaction } from "@/app/types/interfaces";

interface Props {
  transaction: ITransaction;
}

export default function TransactionRow({ transaction }: Props) {
  const editModalProps = {
    openButtonText: "edit",
    header: "edit transaction",
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        <div
          className={`${
            transaction.type === "income"
              ? "bg-green-200 dark:bg-green-400"
              : "bg-red-200 dark:bg-red-400"
          } rounded-full p-2 text-xs uppercase flex items-center justify-center`}
        >
          {transaction.type === "income" ? "income" : "expense"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        {transaction.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        {transaction.notes}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        ${transaction.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        {new Date(transaction.date).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-2">
        <EditTransactionModal
          modalProps={editModalProps}
          thisTransaction={transaction}
        />
        <DeleteTransactionModal thisTransaction={transaction} />
      </td>
    </tr>
  );
}
