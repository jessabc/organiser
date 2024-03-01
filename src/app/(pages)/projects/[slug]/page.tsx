'use client'

import Column from '@/app/_components/projects/Column'
import DeleteBoardModal from '@/app/_components/projects/modals/DeleteModal'
import EditBoardModal from '@/app/_components/projects/modals/EditBoardModal'
import deleteBoard from '@/app/_lib/helpers/deleteBoard'
import getOnDragEnd from '@/app/_lib/helpers/getOnDragEnd'
import { setAllBoards } from '@/app/_redux/features/boards/boardsSlice'
import { setCurrentBoard } from '@/app/_redux/features/boards/currentBoardSlice'
import { useAppDispatch, useAppSelector } from '@/app/_redux/hooks'
import { RootState } from '@/app/_redux/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

export default function page({params}) {

    const boards = useAppSelector((state: RootState) => state.boards.value)


    let thisBoardName = params.slug.replace('%20', ' ')
    const thisBoard = boards.find(board => board.name === thisBoardName)
    const dispatch = useAppDispatch()
    dispatch(setCurrentBoard(thisBoard))
    console.log(thisBoard)
const router = useRouter()
  

    const deleteProps = {
        headerText: 'Delete this board?',
        paragraphText: `Are you sure you want to delete the '${thisBoardName}' task and its subtasks? This action cannot be reversed`,
        onDelete: () =>  deleteBoard(boards, thisBoard, dispatch, setAllBoards, router)
      }

      const columnEl = thisBoard?.columns.map((column, index) => <Column key={column.name} column={column} index={index}/>)

      const onDragEnd = getOnDragEnd(boards, thisBoard, dispatch)

  return (

    <div className='mb-10'>
      <div className="flex flex-col sm:flex-row justify-between mb-5">
        <h3 className='font-bold text-xl mb-2'>{thisBoardName}</h3>
        <div className='flex gap-2'>
            <EditBoardModal/>
            <DeleteBoardModal deleteProps={deleteProps}/>
        </div>
      </div> 
      <DragDropContext onDragEnd={onDragEnd}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {columnEl}
      </div>
      </DragDropContext>
    </div>
    
  )
}
