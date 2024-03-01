import { useAppSelector } from '@/app/_redux/hooks'
import { RootState } from '@/app/_redux/store'
import React from 'react'
import CategoryCard from './CategoryCard'
import EditCategoriesModal from './modals/EditCategoriesModal'

export default function CategorySection() {

    const card = useAppSelector((state: RootState) => state.card.value)

    const categoryEl = (card.categories).slice(1).map(category => <CategoryCard key={category} category={category} transactions={card.transactions}/>)

  return (
    <div className='my-10'>
        <div className='flex gap-2 items-end mb-2'>
          <h4 className='font-bold text-xl'>Categories</h4>
          <EditCategoriesModal/>
        </div>
        <div className='grid gap-2 grid-cols-2'>
          {categoryEl} 
        </div>
    </div>
  )
}

