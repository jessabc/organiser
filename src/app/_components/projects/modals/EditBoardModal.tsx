"use client"

import { setAllBoards } from "@/app/_redux/features/boards/boardsSlice";
import { useAppDispatch } from "@/app/_redux/hooks";
import { useEffect } from "react"
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Modal from "../../shared/Modal";
import useModalToggle from "@/app/_hooks/useModalToggle";
import { Board, Column } from "@/app/types/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

const schema = yup.object({
  name: yup.string().required("Name is a required field"),
}).required();
 
type FormData = yup.InferType<typeof schema>

type Inputs = {
  name: string,
  columns: Column[],
}

interface Props {
  boards: Board[], 
  currentBoard: Board,
}
  
export default function EditBoardModal({boards, currentBoard}: Props) {
  
  const {isOpen, setIsOpen, closeModal, openModal} = useModalToggle()

  const dispatch = useAppDispatch()

  const pathname = usePathname()
  
  const router = useRouter()

  const columnsArray = currentBoard?.columns
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful } 
  } = useForm<FormData>({
      defaultValues: {
      // NEED TO FIX TS
      // @ts-ignore
      columns: columnsArray
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
      name: "columns",
  })

  useEffect(() => {
    reset({
      // NEED TO FIX TS
      // @ts-ignore
      columns: columnsArray})
  }, [currentBoard, columnsArray, reset])

  function onCloseModal() {
    closeModal()
    reset()
  }
 
  const onSubmit: SubmitHandler<Inputs> = (data) => { 
    const updatedBoards = boards.map(board => board.name === currentBoard.name ? data : board)
    dispatch(setAllBoards(updatedBoards))
  
    if(pathname.includes("%20") ? pathname.replace("%20", " ") : pathname === `/projects/${currentBoard.name}`) {
      router.push(`/projects/${data.name}`)
    } 
 
    setIsOpen(false)
  }
 
  function ButtonProps() {
    return (
      <button
      type="button"
      onClick={openModal}
      className={`${pathname === "/" || pathname === "/projects" ? "hover:text-gray-500 dark:hover:text-gray-600" : "rounded-md bg-indigo-500  px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
    </button>
    )
  } 

  return (
    <>
      <Modal buttonProps={<ButtonProps/>} isOpen={isOpen} closeModal={onCloseModal}>
        {/* NEED TO FIX TS */}
        {/* @ts-ignore */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <button type="reset" 
            onClick={onCloseModal} className="ml-auto text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-md mt-1 mr-1"> 
              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
          </button>

          <h3 className="font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100">Edit Board</h3>

          <div className="flex justify-between items-center">
            <label htmlFor="name">Name</label>
            <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.name?.message}</p>
          </div>
          <input 
              defaultValue={currentBoard?.name} 
              {...register("name")} 
              className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2 dark:text-zinc-100"/>

          <p>Columns</p>
          <ul>
              {fields.map((item, index) => {
              return (
                  <li key={item.id} className="flex items-center">
                      <input
                          // NEED TO FIX TS
                          // @ts-ignore
                          {...register(`columns.${index}.name`, { required: true })}
                          className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1 dark:text-zinc-100" 
                      />
                      <button type="button" onClick={() => remove(index)} className="cursor-pointer">
                      <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                      </button>
                  </li>
              )})}
          </ul>

          <button
              type="button"
              onClick={() => {append({id: 0, name: "", tasks:[]})}}   
              className="text-indigo-500 bg-gray-200 rounded-full py-2 my-2 mt-3 w-full font-semibold hover:bg-gray-300"
          >
              +Add New Column
          </button>

          <input 
              type="submit" 
              value="Save Changes" 
              className="text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer" />
        </form>
      </Modal>
    </>
  )
}
