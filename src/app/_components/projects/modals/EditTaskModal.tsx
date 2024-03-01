import { setAllBoards } from '@/app/_redux/features/boards/boardsSlice';
import { useAppDispatch, useAppSelector } from '@/app/_redux/hooks';
import { RootState } from '@/app/_redux/store';
import getStatusOptions from '@/app/_lib/helpers/getStatusOptions';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';

export default function EditTaskModal({task}) {
  
  let [isOpen, setIsOpen] = useState(false)

  const boards = useAppSelector((state: RootState) => state.boards.value)
  const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)
  const dispatch = useAppDispatch()
  const statusOptionElements = getStatusOptions(currentBoard)
  const subtasksArray = task.subtasks 

  const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
        subtasks: subtasksArray
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
    
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function onSubmit(data) {

    const originalTask = task
    const updatedTask = data

    let updatedColumns = []

    // status/column doesnt change
    if(updatedTask.status === originalTask.status) {
      currentBoard.columns.forEach(column => {
        if(column.name === originalTask.status) {
            const updatedTasks =    column.tasks.map(task => task.title === originalTask.title ? updatedTask : task )    
            const updatedColumn = {...column, tasks: updatedTasks}
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
          const updatedTasksInOriginalColumn =    column.tasks.filter(task => task.title != originalTask.title)
          const updatedOriginalColumn = {...column, tasks: updatedTasksInOriginalColumn}
          updatedColumns = [...updatedColumns, updatedOriginalColumn]
        // new  column- add task
        } else if(column.name === updatedTask.status) {
          // add task to new column
          const updatedTasksInNewColumn =   [...column.tasks, updatedTask]
          const updatedNewColumn = {...column, tasks: updatedTasksInNewColumn}
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
      <div className="">
        <button
          type="button"
          onClick={openModal}
          // className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          className='hover:text-gray-500'
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
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
                  
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>

                  <button type='reset' 
                    onClick={closeModal} className='ml-auto text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-md mt-1 mr-1'> 
                    <img src="/assets/icon-cross.svg" alt='cross to close modal'/>
                  </button>

                  <h3 className='font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100'>Edit Task</h3>
                
                  <label htmlFor='title'>Title</label>
                  <input 
                      defaultValue={task.title} 
                      {...register('title')} 
                      className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'
                  />

                  <label htmlFor='description'>Description</label>
                  <input 
                      defaultValue={task.description}
                      {...register('description')} 
                      className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'
                  />
              
                  <p>Subtasks</p>
                  <ul>
                      {fields.map((item, index) => {
                      return (
                          <li key={item.id} className='flex items-center'>
                              <input
                                  {...register(`subtasks.${index}.title`, { required: true })}
                                  className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1'
                              />
                              <button 
                              type='button' 
                              onClick={() => remove(index)} 
                              className='cursor-pointer'>
                                  <img src="/assets/icon-cross.svg" alt='cross icon to close modal' />
                              </button>
                          </li>
                      )})}
                  </ul>

                  <button
                      type='button'
                      onClick={() => {append({title:'', isCompleted: false})}}
                      className='text-indigo-500 bg-gray-200 rounded-full py-2 my-2 mt-3 w-full font-semibold'
                  >
                      +Add New Subtask
                  </button>

                  <section className='my-2 flex flex-col'>
                      <p>Status</p>
                      <select 
                          id='status' 
                          {...register('status')}  
                          className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 pl-2 outline-none focus:border-indigo-500 mb-2'
                          defaultValue={task.status}
                      >
                          {statusOptionElements}
                      </select>
                  </section>

                  <input 
                  type='submit' 
                  className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer'/>

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
