import React from 'react'
import EditBoardModal from './modals/EditBoardModal'
import deleteBoard from '@/app/_lib/helpers/deleteBoard'
import { useAppDispatch, useAppSelector } from '@/app/_redux/hooks'
import { RootState } from '@/app/_redux/store'
import { useRouter } from 'next/navigation'
import { setAllBoards } from '@/app/_redux/features/boards/boardsSlice'
import DeleteBoardModal from '@/app/_components/projects/modals/DeleteModal';
import Link from 'next/link'

export default function BoardCard({board}) {

    const boards = useAppSelector((state: RootState) => state.boards.value)
    const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)
    const dispatch = useAppDispatch()
    const router = useRouter()
    
    const deleteProps = {
        headerText: 'Delete board dashboard',
        paragraphText: `Are you sure you want to delete the '${currentBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`,
        onDelete: () => deleteBoard(boards, currentBoard, dispatch, setAllBoards, router)
      }
      
  return (
    <div className=' flex justify-between gap-5 h-20    bg-opacity-40 items-center py-2 px-8 bg-white border shadow-sm rounded-xl'>

      
        <Link href={`/project/${board.name}`} className='font-semibold hover:text-gray-600'>{board.name}</Link>
        
        <div className='flex gap-2'>
        <EditBoardModal/>
          <DeleteBoardModal deleteProps={deleteProps}/>
        </div>
        
    </div>
  )
}
