"use client"

import { useEffect } from "react";
import { RootState } from "@/app/_redux/store";
import { setAllBoards } from "@/app/_redux/features/boards/boardsSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Column } from "@/app/types/interfaces";

const schema = yup.object({
    name: yup.string().required("Name is a required field"),
  }).required();
   
  type FormData = yup.InferType<typeof schema>
  
  type Inputs = {
    name: string,
    columns: Column[],
  }
 
export default function CreateNewBoardModal() {
 
    const boards = useAppSelector((state: RootState) => state.boards.value)
    const dispatch = useAppDispatch()
    const router = useRouter()
  
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>({
        defaultValues: {
        columns:  [{name: "", tasks:[], id:""}],
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
        name: "columns",
    })
  
    useEffect(() => {
        reset({ 
            name: "",
            columns:  [{name: "", tasks:[], id:""}]
        })
      }, [isSubmitSuccessful]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const updatedBoards = [...boards, data]
        dispatch(setAllBoards(updatedBoards))
        router.push(`/projects/${data.name}`)
    }

    return (
        <>
            <div className="m-5">
                <p className="font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100">Add New Board</p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <label htmlFor="name">Name</label>
                        <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.name?.message}</p>
                    </div>
                    <input 
                        id="name" 
                        {...register("name")} 
                        className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2"/>

                        <label>Columns</label>
                        <ul>
                            {fields.map((item, index) => {
                            return (
                                <li key={item.id} className="flex items-center">
                                    <input
                                        {...register(`columns.${index}.name`)}
                                        className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1"/>
                                    <button 
                                    type="button" 
                                    onClick={() => remove(index)} 
                                    className="cursor-pointer">
                                        <img src="/assets/icon-cross.svg" alt="cross icon to close modal"/>
                                    </button>
                                </li>
                            )})}
                        </ul>

                        <button
                            type="button"
                            onClick={() => {append({id:"", name: "", tasks:[]})}}
                            className="text-indigo-500 bg-gray-200 hover:bg-gray-300 rounded-full py-2 my-2 mt-3"
                        >
                            + Add New Column
                        </button>

                        <input 
                            type="submit" 
                            value="Create New Board" 
                            className="text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer" 
                        />
                </form>
            </div>
        </>
    )
}

