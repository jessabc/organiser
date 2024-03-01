import React from 'react'
import EditTransactionModal from './modals/TransactionModal'
import DeleteTransactionModal from './modals/DeleteTransactionModal'


export default function Transaction({transaction}) {
  
  const editModalProps = {
    openButtonText: 'edit',
    header: 'edit transaction',
    thisTransaction: {transaction}
  }

  const deleteModalProps = {
    openButtonText: 'delete',
    header: 'delete transaction',
    thisTransaction: {transaction}
  }

 
  return (
    <>
      <div className=' flex justify-between gap-5 h-20    bg-opacity-40 items-center p-2 bg-white border shadow-sm rounded-xl'>
        <div className={`${transaction.type === 'income' ? "bg-green-200" :"bg-red-200" } rounded-full p-2`}>
          {transaction.type === 'income' ? 
          (<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trending-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>) 
          :
          (<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trending-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7l6 6l4 -4l8 8" /><path d="M21 10l0 7l-7 0" /></svg>)}
        </div>
      
        {/* <p>{transaction.type}</p> */}
        <div className='flex flex-col '>
          <p className='font-bold'>{transaction.category}</p>
          <p className='text-sm'>    {transaction.notes}</p>
        </div>
        
        <div className='flex flex-col '>
          <p className={`${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'} font-bold text-lg text-right`}>
          {transaction.type === 'income' ? transaction.amount : `-${transaction.amount} `}</p>
          <p className='text-xs'>{new Date(transaction.date).toLocaleDateString()}</p>
        </div>

        <div className='flex gap-2'>
          <EditTransactionModal modalProps={editModalProps} />
          <DeleteTransactionModal thisTransaction={transaction}/>
        </div>
          
      </div>
    </>
  )
}
