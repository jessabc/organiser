import React from "react"
import EditBoardModal from "../modals/EditBoardModal"
import deleteBoard from "../../../_helpers/deleteBoard"
import { useAppDispatch, useAppSelector } from "../../../_redux/hooks"
import { RootState } from "../../..//_redux/store"
import { useRouter } from "next/navigation"
import DeleteBoardModal from "../../..//_components/projects/modals/DeleteModal";
import Link from "next/link"
import { Board } from "../../..//types/interfaces"

interface Props {
  board: Board
}

export default function BoardCard({board}: Props) {
 
  const boards: Board[] = useAppSelector((state: RootState) => state.boards.value)
  const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  const deleteProps = {
    headerText: "Delete board dashboard",
    paragraphText: `Are you sure you want to delete the "${currentBoard?.name}" board? This action will remove all columns and tasks and cannot be reversed.`,
    onDelete: () => deleteBoard(boards, currentBoard, dispatch, router)
  }
      
  return (
    <div className="flex justify-between gap-5 h-20 bg-opacity-40 items-center py-2 px-8 bg-white border shadow-sm rounded-xl">
      <Link href={`/projects/${board.name}`} className="font-semibold hover:text-gray-600">
        {board.name}
      </Link>
      <div className="flex gap-2">
        <EditBoardModal boards={boards} currentBoard={currentBoard}/>
        <DeleteBoardModal deleteProps={deleteProps}/>
      </div>
    </div>
  )
}
