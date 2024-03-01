import React from 'react'
import EditCardModal from './modals/EditCardModal'
import { useAppSelector } from '@/app/_redux/hooks'
import { RootState } from '@/app/_redux/store'

export default function Card() {

    const card = useAppSelector((state: RootState) => state.card.value)

  return (
    <div className="flex flex-col  bg-white border shadow-sm rounded-xl h-40 
    p-4 text-gray-100   bg-[url('https://source.unsplash.com/yellow-pink-and-blue-polka-dot-illustration-gVwDCVzTylk')] ">
        <div className='ml-auto '>
            <EditCardModal/>
        </div>
        <div className=' mb-3'>
            <p className='text-sm'>Balance</p>
            <p className='text-2xl font-bold'> $  {card.amount}</p>
        </div>
        <p className='font-mono'>1234 5678 9012 2345</p>
    </div>
  )
}
