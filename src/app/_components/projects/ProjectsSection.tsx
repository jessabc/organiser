import { useAppSelector } from '@/app/_redux/hooks'
import { RootState } from '@/app/_redux/store'
import React from 'react'
import BoardCard from './BoardCard'

export default function ProjectsSection() {

    const boards = useAppSelector((state: RootState) => state.boards.value)

    console.log(boards)

    const boardEl = boards.map(board => <BoardCard key={board.id} board={board} />)

  return (
        
<div className='my-10'>
        <div className='flex gap-2 items-end mb-2'>
          <h4 className='font-bold text-xl'>Current Projects</h4>
        </div>
        <div className='grid gap-2 grid-cols-2'>
        {boardEl}
        </div>
    </div>


  )
}
