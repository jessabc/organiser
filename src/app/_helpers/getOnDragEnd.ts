"use client"

import { useEffect, useState } from "react"
import { Dispatch } from "redux";
import { setCurrentBoard } from "../_redux/features/boards/currentBoardSlice"
import { setAllBoards } from "../_redux/features/boards/boardsSlice"
import { Board, Column } from "../types/interfaces"

export default function getOnDragEnd(boards: Board[], currentBoard: Board, dispatch: Dispatch) {

  const [columns, setColumns] = useState()
    
  useEffect(() => {
    // @ts-ignore
    setColumns(currentBoard.columns)
  },[currentBoard])
  
  // @ts-ignore
  const onDragEnd = ({ source, destination }) => { 

    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // Make sure we"re actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null
   
    // Set start and end variables
    // @ts-ignore
    const start = columns.find(column => column.name === source.droppableId)
    // @ts-ignore
    const end = columns.find(column => column.name === destination.droppableId)

    // If start is the same as end, we"re in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.tasks.filter(
        // @ts-ignore
        (_, idx) => idx !== source.index
      )
      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.tasks[source.index])

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        name: source.droppableId,
        tasks: newList
      }

      // Update the state
      setColumns(prev => (
        // @ts-ignore
        prev.map(column => (
          column.name === newCol.name ? newCol : column
        ))
      ))

      const updatedColumns = currentBoard.columns.map(column => column.name === source.droppableId ? newCol : column)

      const updatedBoard = {...currentBoard, columns: updatedColumns}

      dispatch(setCurrentBoard(updatedBoard))

      const updatedBoards = boards.map(board => (
        board.name === currentBoard.name ? updatedBoard: board))

      dispatch(setAllBoards(updatedBoards))

      return null

    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.tasks.filter(
        // @ts-ignore
        (_, idx) => idx !== source.index
      )

      // Create a new start column
      const newStartCol = {
        id: start.id,
        name: source.droppableId,
        tasks: newStartList
      }

      // Make a new end list array
      let newEndList = [...end.tasks]
      console.log(newEndList)

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.tasks[source.index])

      const newerEndList = newEndList.map(task => (
        task.status === destination.droppableId ? task: {...task, status: destination.droppableId}
      ))
     
      //Create a new end column
      const newEndCol = {
        id: end.id,
        name: destination.droppableId,
        tasks: newerEndList
      }

      // Update the state
      let updatedColumns = currentBoard.columns.map(column => column.name === source.droppableId ? newStartCol : column)

      updatedColumns = updatedColumns.map(column => column.name === destination.droppableId ? newEndCol : column)

      const updatedBoard = {...currentBoard, columns: updatedColumns}

      dispatch(setCurrentBoard(updatedBoard))

      const updatedBoards = boards.map(board => (
        board.name === currentBoard.name ? updatedBoard: board))

      dispatch(setAllBoards(updatedBoards))
    
      return null
    }
  }

  return onDragEnd
}
