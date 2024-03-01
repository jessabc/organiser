'use client'

import { RootState } from '@/app/_redux/store';
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Transaction from '@/app/_components/finance/Transaction';
import AddNewTransactionModal from '@/app/_components/finance/modals/TransactionModal';
import TransactionTable from '@/app/_components/finance/TransactionTable';
import TransactionRow from '@/app/_components/finance/TransactionRow';
import FilterDropdown from '@/app/_components/finance/dropdown/FilterDropdown';
import SortDropdown from '@/app/_components/finance/dropdown/SortDropdown';
import getFilteredTransactions from '@/app/_lib/helpers/getFilteredTransactions';


export default function page(){

  const [filterQuery, setFilterQuery] = useState('')
  const [sortQuery, setSortQuery] = useState('')

  const card = useSelector((state: RootState) => state.card.value)

  const transactionEl = getFilteredTransactions(card, filterQuery, sortQuery)?.map(transaction => <Transaction key={transaction.id} transaction={transaction} />)

  const transactionRowEl = getFilteredTransactions(card, filterQuery, sortQuery)?.map(transaction => <TransactionRow key={transaction.id} transaction={transaction} />)

  const modalProps = {
    openButtonText: 'new',
    header: 'new transaction',
  }

  
  return (
    <div className='mb-10'>
      <div className="flex flex-col sm:flex-row justify-between mb-5">
        <h3 className='font-bold text-xl mb-2'>Transactions</h3>
        <div className='flex gap-2'>
          <FilterDropdown setFilterQuery={setFilterQuery}/>
          <SortDropdown setSortQuery={setSortQuery}/>
          <AddNewTransactionModal modalProps={modalProps} />
        </div>
      </div> 
      <div className='flex flex-col gap-3 md:hidden'>
        {transactionEl}
      </div>
      <div className='hidden md:block'>
        <TransactionTable transactionRowEl={transactionRowEl}/>
      </div>
    </div>
  )
}
 