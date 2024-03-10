import { setAllBoards } from "@/app/_redux/features/boards/boardsSlice";
import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import getStatusOptions from "@/app/_helpers/getStatusOptions";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Modal from "../../shared/Modal";
import useModalToggle from "@/app/_hooks/useModalToggle";
import { Board, Column, Task } from "@/app/types/interfaces";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  title: yup.string().required("Title is a required field"),
}).required();
 
type FormData = yup.InferType<typeof schema>

type Inputs = {
  title: string,
  description: string,
  subtasks: string[],
  status: string
}

interface Props {
  task: Task
}

export default function EditTaskModal({task}: Props) {
 
  const {isOpen, setIsOpen, closeModal, openModal} = useModalToggle()

  const boards: Board[] = useAppSelector((state: RootState) => state.boards.value)
  const currentBoard: Board = useAppSelector((state: RootState) => state.currentBoard.value)
  const dispatch = useAppDispatch()
  const statusOptionElements = getStatusOptions(currentBoard)
  const subtasksArray = task.subtasks 
 
  const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
        // NEED TO FIX TS 
        // @ts-ignore 
        subtasks: subtasksArray
        },
        mode: "onChange",
        resolver: yupResolver(schema)
    })

  const {
        fields,
        append,
        remove,
    } = useFieldArray({
        // NEED TO FIX TS 
        // @ts-ignore 
        control,
        // NEED TO FIX TS 
        // @ts-ignore 
        name: "subtasks",
    })
    
  function ButtonProps() {
    return (
      <button
          type="button"
          onClick={openModal}
          className="hover:text-gray-500 "
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
        </button>
    )
  } 

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const originalTask = task
    const updatedTask = data

    let updatedColumns: Column[] = []

    // status/column doesnt change
    if(updatedTask.status === originalTask.status) {
      currentBoard.columns.forEach(column => {
        if(column.name === originalTask.status) {
            const updatedTasks =    column.tasks.map(task => task.title === originalTask.title ? updatedTask : task )    
            const updatedColumn = {...column, tasks: updatedTasks}
            // NEED TO FIX TS 
            // @ts-ignore 
            updatedColumns = [...updatedColumns, updatedColumn]
        } else {
            updatedColumns  = [...updatedColumns, column]
        }
      })
    }

    // status/col changes
    if(updatedTask.status != originalTask.status) {
      currentBoard.columns.forEach(column => {
        // orignal column- delete task
        if(column.name === originalTask.status) {
          // delete in original column
          const updatedTasksInOriginalColumn = column.tasks.filter(task => task.title != originalTask.title)
          const updatedOriginalColumn = {...column, tasks: updatedTasksInOriginalColumn}
          updatedColumns = [...updatedColumns, updatedOriginalColumn]
        // new  column- add task
        } else if(column.name === updatedTask.status) {
          // add task to new column
          const updatedTasksInNewColumn =   [...column.tasks, updatedTask]
          const updatedNewColumn = {...column, tasks: updatedTasksInNewColumn}
          // NEED TO FIX TS 
          // @ts-ignore 
          updatedColumns = [...updatedColumns, updatedNewColumn]
        } else {
          updatedColumns  = [...updatedColumns, column]
        }
      })
    }
  
    const updatedBoard = {...currentBoard, columns: updatedColumns}
    const updatedBoards = boards.map(board => board.name === currentBoard.name ? updatedBoard : board)
    dispatch(setAllBoards(updatedBoards))
    closeModal()
  }

  return (
    <>
      <Modal buttonProps={<ButtonProps/>} isOpen={isOpen} closeModal={closeModal}>
        {/* NEED TO FIX TS 
        @ts-ignore  */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <button type="reset" 
            onClick={closeModal} className="ml-auto text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-md mt-1 mr-1"> 
              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
          </button>

          <h3 className="font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100">Edit Task</h3>

          {/* title */}
          <div className="flex justify-between items-center">
            <label htmlFor="title">Title</label>
            <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.title?.message}</p>
          </div>
          <input 
            defaultValue={task.title} 
            {...register("title")} 
            className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2 dark:text-zinc-100"
          />

          <label htmlFor="description">Description</label>
          <input 
            defaultValue={task.description}
            // NEED TO FIX TS 
            // @ts-ignore 
            {...register("description")} 
            className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2 dark:text-zinc-100"
          />

          <p>Subtasks</p>
          <ul>
              {fields.map((item, index) => {
              return (
                  <li key={item.id} className="flex items-center">
                      <input
                        // NEED TO FIX TS 
                        // @ts-ignore 
                        {...register(`subtasks.${index}.title`, { required: true })}
                        className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1 dark:text-zinc-100"
                      />
                      <button 
                      type="button" 
                      onClick={() => remove(index)} 
                      className="cursor-pointer">
                        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                      </button>
                  </li>
              )})}
          </ul>

          <button
              type="button"
              onClick={() => {append({title:"", isCompleted: false})}}
              className="text-indigo-500 bg-gray-200 rounded-full py-2 my-2 mt-3 w-full font-semibold"
          >
              +Add New Subtask
          </button>

          <section className="my-2 flex flex-col">
              <p>Status</p>
              <select 
                  id="status" 
                  // NEED TO FIX TS 
                  // @ts-ignore 
                  {...register("status")}  
                  className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 pl-2 outline-none focus:border-indigo-500 mb-2"
                  defaultValue={task.status}
              >
                  {statusOptionElements}
              </select>
          </section>

          <input 
          type="submit" 
          className="text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer"/>

        </form>
    </Modal>
  </>
  )
}
