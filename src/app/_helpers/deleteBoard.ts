import { setAllBoards } from "@/app/_redux/features/boards/boardsSlice"
import { Board } from "../types/interfaces"

export default function deleteBoard(boards: Board[], currentBoard: Board, dispatch, router) {
  
  const updatedBoards = boards?.filter(board => board.name != currentBoard?.name)
  dispatch(setAllBoards(updatedBoards))
  router.push("/projects/new")
}
 