import React from 'react'

export default function CategoryCard({category, transactions}) {

    let categoryTotal= transactions.reduce((acc, curr) => {
        return acc = curr.category === category ? acc + curr.amount : acc
    }, 0)
   
    
  return (

    <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] ">
  <div class="p-4 md:p-5">
    <h3 class="text-lg font-bold text-gray-800 dark:text-white">
    {category}
    </h3>
    <p class="mt-2 text-gray-500 dark:text-gray-400">
    $ {categoryTotal}
    </p>
   
  </div>
</div>

    // <div className='flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]'>
    //     <p className='text-xs font-bold'>{category}</p>
    //     <p className='font-bold text-indigo-100'>$ {categoryTotal}</p>
    // </div>
  )
}
