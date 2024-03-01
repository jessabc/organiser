import { setCurrentBoard } from '@/app/_redux/features/boards/boardsSlice'
import Link from 'next/link'

import React from 'react'
import { useDispatch } from 'react-redux'

export default function BoardName({board}) {

  const dispatch = useDispatch()

  // const handleClick = () => {
  //   dispatch(setCurrentBoard(board))
  // }
// onClick={handleClick}
  return (
    <>
      <Link href={`/projects/${board.name}`}  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" >
      {board.name}
    </Link>  
    
    </>
  )
}
