'use client'

import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import { RootState } from '@/app/_redux/store';
import { setAllBoards } from '@/app/_redux/features/boards/boardsSlice';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/_redux/hooks';
 
export default function CreateNewBoardModal() {

    const boards = useAppSelector((state: RootState) => state.boards.value)
    const dispatch = useAppDispatch()
    const router = useRouter()
  
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm({
        defaultValues: {
        columns:  [{name: '', tasks:[], id:''}],
        },
        mode: 'onChange'
    })
    const { 
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'columns',
    })

    useEffect(() => {
        reset({ 
            name: '',
            columns:  [{name: '', tasks:[], id:''}]
        })
      }, [isSubmitSuccessful]);

    function onSubmit(data) {
        const updatedBoards = [...boards.boards, data]
        dispatch(setAllBoards(updatedBoards))
        router.push(`/project/${data.name}`)
    }


    return (
        <>
            <div className='m-5'>
                <p className='font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100'>Add New Board</p>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                    <label htmlFor='name'>Name</label>
                    <input 
                        id='name' 
                        {...register('name')} 
                        className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'/>

                        <label>Columns</label>
                        <ul>
                            {fields.map((item, index) => {
                            return (
                                <li key={item.id} className='flex items-center'>
                                    <input
                                        {...register(`columns.${index}.name`, { required: true })}
                                        className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1'/>
                                    <button 
                                    type='button' 
                                    onClick={() => remove(index)} 
                                    className='cursor-pointer'>
                                        <img src='/assets/icon-cross.svg' alt='cross icon to close modal'/>
                                    </button>
                                </li>
                            )})}
                        </ul>

                        <button
                            type='button'
                            onClick={() => {append({id:'', name: '', tasks:[]})}}
                            className='text-indigo-500 bg-gray-200 hover:bg-gray-300 rounded-full py-2 my-2 mt-3'
                        >
                            + Add New Column
                        </button>

                        <input 
                            type='submit' 
                            value='Create New Board' 
                            className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer' 
                        />
                </form>
            </div>
        </>
    )
}

