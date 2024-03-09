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
        // NEED TO FIX TS
        // @ts-ignore
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
        // NEED TO FIX TS
        // @ts-ignore
        control,
        // NEED TO FIX TS
        // @ts-ignore
        name: "columns",
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const updatedBoards = [...boards, data]
        dispatch(setAllBoards(updatedBoards))
        router.push(`/projects/${data.name}`)
    }

    return (
        <>
            <div className="m-5">
                <p className="font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100">Add New Board</p>

                {/* NEED TO FIX TS */}
                {/* @ts-ignore */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <label htmlFor="name">Name</label>
                        <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.name?.message}</p>
                    </div>
                    <input 
                        id="name" 
                        {...register("name")} 
                        className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2 dark:text-zinc-100" />

                        <label>Columns</label>
                        <ul>
                            {fields.map((item, index) => {
                            return (
                                <li key={item.id} className="flex items-center">
                                    <input
                                        // NEED TO FIX TS
                                        // @ts-ignore
                                        {...register(`columns.${index}.name`)}
                                        className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1 dark:text-zinc-100"/>
                                    <button 
                                    type="button" 
                                    onClick={() => remove(index)} 
                                    className="cursor-pointer dark:text-zinc-100">
                                        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                                    </button>
                                </li>
                            )})}
                        </ul>

                        <button
                            type="button"
                            onClick={() => {append({id:"", name: "", tasks:[]})}}
                            className="text-indigo-500 bg-gray-200 hover:bg-gray-300 rounded-full py-2 my-2 mt-3 "
                        >
                            + Add New Column
                        </button>

                        <input 
                            type="submit" 
                            value="Create New Board" 
                            className="text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer " 
                        />
                </form>
            </div>
        </>
    )
}

