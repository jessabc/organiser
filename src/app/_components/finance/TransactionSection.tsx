import getFilteredTransactions from '@/app/_lib/helpers/getFilteredTransactions'
import { useAppSelector } from '@/app/_redux/hooks'
import { RootState } from '@/app/_redux/store'
import React from 'react'
import Transaction from './Transaction'

export default function TransactionSection() {

    const card = useAppSelector((state: RootState) => state.card.value)

    const transactionEl = (card.transactions.length > 5 ? getFilteredTransactions(card, null, 'descending').slice(-5) : getFilteredTransactions(card, null, 'descending'))?.map(transaction => <Transaction key={transaction.id} transaction={transaction} />)

  return (
    <div className='my-10'>
        <h4 className='font-bold text-xl mb-2'>Recent Transactions</h4>
        <div className='flex flex-col gap-3 '>
        {transactionEl}
        </div>
    </div>
  )
}
