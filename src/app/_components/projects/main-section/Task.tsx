import { Draggable } from "react-beautiful-dnd"
import DeleteTaskModal from "@/app/_components/projects/modals/DeleteModal"
import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks"
import { RootState } from "@/app/_redux/store"
import { setAllBoards } from "@/app/_redux/features/boards/boardsSlice"
import EditTaskModal from "../modals/EditTaskModal"
import EditSubtasksModal from "../modals/EditSubtasksModal"
import getNumCompletedSubtasks from "@/app/_helpers/getNumCompletedSubtasks"
import { useState } from "react"
import deleteTask from "@/app/_helpers/deleteTask"
import React from "react"
import { Task } from "@/app/types/interfaces"
 
interface Props {
  task: Task,
  index: number, 
}
 
export default function Task({task, index}: Props) {
 
  const boards = useAppSelector((state: RootState) => state.boards.value)
  const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)
  const dispatch = useAppDispatch()

  const [numCompletedSubtasks, setNumCompletedSubtasks] = useState(getNumCompletedSubtasks(task))

  const deleteProps = {
    headerText: "Delete this task?",
    paragraphText: `Are you sure you want to delete the "${task?.title}" task and its subtasks? This action cannot be reversed`,
    onDelete: () => deleteTask(currentBoard, task, dispatch, boards, setAllBoards)
  }
  
  return (
    <>
      {/* credit to https://dev.to/imjoshellis/codealong-multi-column-drag-and-drop-in-react-3781 */}
      <Draggable draggableId={task.title} index={index}> 
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >

          {/* Task Card */}
          <div 
            className="cursor-grab dahover:dark:bg-zinc-700 flex flex-col my-3  p-3 h-40 w-60  hover:shadow-lg justify-between bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <p className="text-gray-900 font-bold pt-2 dark:text-zinc-200 line-clamp-2 ">{task.title}</p>  
              <EditSubtasksModal task={task} numCompletedSubtasks={numCompletedSubtasks} setNumCompletedSubtasks={setNumCompletedSubtasks}/>
              <div className="flex gap-1 justify-end">
                <EditTaskModal task={task}/>
                <DeleteTaskModal deleteProps={deleteProps}/>
              </div>
          </div>
          </div> 
        )} 
      </Draggable> 
    </>
  )  
}


