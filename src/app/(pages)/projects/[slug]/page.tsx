"use client"

import Column from "@/app/_components/projects/main-section/Column"
import DeleteBoardModal from "@/app/_components/projects/modals/DeleteModal"
import EditBoardModal from "@/app/_components/projects/modals/EditBoardModal"
import deleteBoard from "@/app/_helpers/deleteBoard"
import useGetOnDragEnd from "@/app/_hooks/useGetOnDragEnd"
import { setCurrentBoard } from "@/app/_redux/features/boards/currentBoardSlice"
import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks"
import { RootState } from "@/app/_redux/store"
import React from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { useRouter } from "next/navigation"
import { Board } from "@/app/types/interfaces"
import { usePathname } from "next/navigation";

export default function ProjectPage({ params }: { params: { slug: string } }) {

  const boards: Board[] = useAppSelector((state: RootState) => state.boards.value)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
   
  let thisBoardName = params.slug.replace("%20", " ")
  const thisBoard = boards.find(board => board?.name === thisBoardName)
  thisBoard && dispatch(setCurrentBoard(thisBoard))
  const currentBoard: Board = useAppSelector((state: RootState) => state.currentBoard.value) 

  const onDragEnd = useGetOnDragEnd(boards, currentBoard, dispatch)

  const columnEl = currentBoard?.columns.map((column, index) => <Column key={column.name} column={column}/>)

  const deleteProps = {
    headerText: "Delete this board?",
    paragraphText: `Are you sure you want to delete the "${currentBoard?.name}" task and its subtasks? This action cannot be reversed`,
    onDelete: () =>  deleteBoard(boards, currentBoard, dispatch, router, pathname)
  }

  return (
    <>
      <title>Organiser | Project</title> 
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between mb-5">
          <h3 className="font-bold text-xl mb-2">{currentBoard?.name}</h3>
          <div className="flex gap-2">
            <EditBoardModal boards={boards} currentBoard={currentBoard}/>
            <DeleteBoardModal deleteProps={deleteProps}/>
          </div>
        </div> 

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {columnEl}
          </div>
        </DragDropContext>
      </div>
    </>
  ) 
}

