import React from 'react'
import DeleteTransactionModal from './modals/DeleteTransactionModal'
import EditTransactionModal from './modals/TransactionModal'

export default function TransactionRow({transaction}) {
  
  const editModalProps = {
    openButtonText: 'edit',
    header: 'edit transaction',
    thisTransaction: {transaction}
  }
      

  return (
    <tr>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        <div className={`${transaction.type === 'income' ? "bg-green-200" :"bg-red-200" } rounded-full p-2 text-xs uppercase flex items-center justify-center`}>
        {transaction.type === 'income' ? "income" : "expense" }
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{transaction.category}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{transaction.notes}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">${transaction.amount}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{new Date(transaction.date).toLocaleDateString()}</td>
      <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-2">
        <EditTransactionModal modalProps={editModalProps} />
        <DeleteTransactionModal thisTransaction={transaction}/>
      </td>
    </tr>
  )
}
