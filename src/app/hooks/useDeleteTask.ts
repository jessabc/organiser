import React from 'react'
import { useAppDispatch, useAppSelector } from '../_redux/hooks'
import { RootState } from '../_redux/store'
import { setAllBoards } from '../_redux/features/boards/boardsSlice'

export default function useDeleteTask(task) {
  
    const boards = useAppSelector((state: RootState) => state.boards.value)
    const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)
    const dispatch = useAppDispatch()

    function deleteTask() {
        let updatedColumns = []
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

    return deleteTask
}
