import getStatusOptions from "@/app/_helpers/getStatusOptions";
import { setAllBoards } from "@/app/_redux/features/boards/boardsSlice";
import { setCurrentBoard } from "@/app/_redux/features/boards/currentBoardSlice";
import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import useModalToggle from "@/app/_hooks/useModalToggle";
import Modal from "../../shared/Modal";
import Column from "../main-section/Column";
import { Board, Subtask } from "@/app/types/interfaces";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  title: yup.string().required("Title is a required field"),
}).required();
 
type FormData = yup.InferType<typeof schema>

type Inputs = {
  title: string,
  description: string,
  subtasks: Subtask[],
  status: string
}
 
export default function AddNewTaskModal() {

  const {isOpen, setIsOpen, closeModal, openModal} = useModalToggle()

  const boards = useAppSelector((state: RootState) => state.boards.value)
  const currentBoard: Board = useAppSelector((state: RootState) => state.currentBoard.value)

  const dispatch = useAppDispatch()

  const router = useRouter()
  
  const statusOptionElements = getStatusOptions(currentBoard)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
        defaultValues: {
          subtasks: [{title: "", isCompleted: false}],
        },
        mode: "onChange",
        resolver: yupResolver(schema)
  })

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "subtasks",
  })
  
  function onCloseModal() {
    closeModal(false)
    reset()
  }

  function ButtonProps() {
    return (
      <button
      type="button"
      onClick={openModal}
      className="hover:bg-gray-100 rounded-lg"
      > 
        <div className="rounded-lg h-12 w-60 border-4 border-dashed border-gray-300"> 
          <p className="text-gray-300 font-semibold my-2">+ New Task</p>
        </div>
    </button>
    )
  } 

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let updatedColumns: typeof Column[] = []

    currentBoard.columns.forEach(column => {
      if(column.name === data.status) {
        const updatedColumn = {...column, tasks: [...column.tasks, data]}
        updatedColumns = [...updatedColumns, updatedColumn]
      } else {
        updatedColumns  = [...updatedColumns, column]
      }
    })  
 
    const updatedBoard = {...currentBoard, columns: updatedColumns}
    const updatedBoards = boards.map(board => board.name === currentBoard.name ? updatedBoard : board)
    dispatch(setCurrentBoard({...updatedBoard}))
    dispatch(setAllBoards([...updatedBoards]))
    closeModal()
   
    router.refresh()
  } 

  return (

    <>
      <Modal buttonProps={<ButtonProps/>} isOpen={isOpen} closeModal={onCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <button 
            type="reset" 
            className="ml-auto text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-md mt-1 mr-1"
            onClick={onCloseModal}
            > 
              <img src="/assets/icon-cross.svg" alt="cross icon to close modal"/> 
          </button>

          <div className="flex flex-col">
            <h3 className="font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100">Add New Task</h3>

            {/* title */}
            <div className="flex justify-between items-center">
              <label htmlFor="title">Title</label>
              <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.title?.message}</p>
            </div>
            <input 
              id="title" 
              {...register("title")} 
              className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2"/>
              
            {/* description */}
            <label htmlFor="description">Description</label>
            <input 
              id="description"  
              {...register("description")} 
              className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2"/>

            {/* subtasks */}
            <label htmlFor="subtasks">Subtasks</label>

            <div>
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li key={item.id} className="flex items-center">
                      <input
                        {...register(`subtasks.${index}.title`, `subtasks.${index}.isCompleted:false`)}  
                        className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1"
                      />
              
                      <button 
                        type="button" 
                        onClick={() => remove(index)} 
                        className="cursor-pointer ">
                        <img src="/assets/icon-cross.svg" alt="cross icon to close modal"/>
                      </button>
                    </li>
                  )
                })} 
              </ul>

              <section>
                <button
                  type="button"
                  onClick={() => {append({title:"", isCompleted: false })}}
                  className="text-indigo-500 bg-gray-200 hover:bg-gray-300 rounded-full py-2 my-2 mt-3 w-full font-semibold">
                  + Add New Subtask
                </button>
              </section>
            </div>

            {/* status */}
            <section className="my-2 flex flex-col ">
              <p >Status</p>
              <select 
                id="status" 
                {...register("status")} 
                className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1  pl-2 outline-none focus:border-indigo-500 mb-2">
                {statusOptionElements}
              </select>
            </section>

            <input 
              type="submit" 
              value="Create Task" 
              className="text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer"
              />
          </div>
        </form>
      </Modal>
    </>
  )
}
