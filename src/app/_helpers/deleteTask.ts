import { Dispatch } from "@reduxjs/toolkit"
import { Board, Column, Task } from "../types/interfaces"

export default function deleteTask(currentBoard: Board, task: Task, dispatch: Dispatch, boards: Board[], setAllBoards) {
 
  let updatedColumns: Column[] = []
  currentBoard.columns.forEach(column => {
    if(column.name === task.status) {
      const updatedTasks = column.tasks.filter(item => item.title != task.title)
      const updatedColumn = {...column, tasks: updatedTasks}
      updatedColumns = [...updatedColumns, updatedColumn]
    } else {
      updatedColumns  = [...updatedColumns, column]
    }
  })

  const updatedBoard = {...currentBoard, columns: updatedColumns}
  const updatedBoards = boards.map(board => board.name === currentBoard.name ? updatedBoard : board)
  dispatch(setAllBoards(updatedBoards))
}