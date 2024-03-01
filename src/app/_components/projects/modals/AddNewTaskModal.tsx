import getStatusOptions from '@/app/_lib/helpers/getStatusOptions';
import { setAllBoards } from '@/app/_redux/features/boards/boardsSlice';
import { useAppDispatch, useAppSelector } from '@/app/_redux/hooks';
import { RootState } from '@/app/_redux/store';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';

export default function AddNewTaskModal() {

  let [isOpen, setIsOpen] = useState(false)

  const boards = useAppSelector((state: RootState) => state.boards.value)
  const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)

  const dispatch = useAppDispatch()
  const statusOptionElements = getStatusOptions(currentBoard)
 
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
        defaultValues: {
          subtasks: [{title: '', isCompleted: false}],
        },
        mode: 'onChange'
  })

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'subtasks',
  })

  useEffect(() => {
    reset({
      title: '',
      description: '',
      subtasks: [{title: '', isCompleted: false}],
    })
  }, [isSubmitSuccessful])
  
  function closeModal() {
    setIsOpen(false)
    reset()
  }

  function openModal() {
    setIsOpen(true)
  }

  function onSubmit(data)  {
    let updatedColumns = []
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
    dispatch(setAllBoards(updatedBoards))
    closeModal()
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          // className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          className='hover:bg-gray-100 rounded-lg'
          > 
            <div className='rounded-lg h-12 w-60 border-4 border-dashed border-gray-300'> 
            <p className='text-gray-300 font-semibold my-2'>+ New Task</p>
            
            </div>
        </button>
      </div>
 
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                    {/* form */}
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                      <button 
                        type='reset' 
                        className='ml-auto text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-md mt-1 mr-1'
                        onClick={closeModal}
                        > 
                          <img src='/assets/icon-cross.svg' alt='cross icon to close modal'/> 
                      </button>

                      <div className='m-10 flex flex-col'>
                        <h3 className='font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100'>Add New Task</h3>

                        {/* title */}
                        <label htmlFor='title'>Title</label>
                        <input 
                          id='title' 
                          {...register('title')} 
                          className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'/>
                          
                        {/* description */}
                        <label htmlFor='description'>Description</label>
                        <input 
                          id='description'  
                          {...register('description')} 
                          className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'/>

                        {/* subtasks */}
                        <label htmlFor='subtasks'>Subtasks</label>

                        <div>
                          <ul>
                            {fields.map((item, index) => {
                              return (
                                <li key={item.id} className='flex items-center'>
                                  <input
                                    {...register(`subtasks.${index}.title`, { required: true }, `subtasks.${index}.isCompleted:false`)}  
                                    className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1'
                                  />
                          
                                  <button 
                                    type='button' 
                                    onClick={() => remove(index)} 
                                    className='cursor-pointer '>
                                    <img src='/assets/icon-cross.svg' alt='cross icon to close modal'/>
                                  </button>
                                </li>
                              )
                            })} 
                          </ul>

                          <section>
                            <button
                              type='button'
                              onClick={() => {append({title:'', isCompleted: false })}}
                              className='text-indigo-500 bg-gray-200 hover:bg-gray-300 rounded-full py-2 my-2 mt-3 w-full font-semibold'>
                              + Add New Subtask
                            </button>
                          </section>
                        </div>

                        {/* status */}
                        <section className='my-2 flex flex-col '>
                          <p >Status</p>
                          <select 
                            id='status' 
                            {...register('status')} 
                            className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1  pl-2 outline-none focus:border-indigo-500 mb-2'>
                            {statusOptionElements}
                          </select>
                        </section>

                        <input 
                          type='submit' 
                          value='Create Task' 
                          className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer'
                          />
                      </div>
                    </form>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
