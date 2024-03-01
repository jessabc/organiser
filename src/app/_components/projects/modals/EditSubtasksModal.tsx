import getStatusOptions from '@/app/_lib/helpers/getStatusOptions';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/_redux/hooks';
import { RootState } from '@/app/_redux/store';
import { setAllBoards } from '@/app/_redux/features/boards/boardsSlice';
import getNumCompletedSubtasks from '@/app/_lib/helpers/getNumCompletedSubtasks'
import Task from '../Task';
import getPercentage from '@/app/_lib/helpers/getPercentage';

export default function EditSubtasksModal({task, numCompletedSubtasks, setNumCompletedSubtasks}) {
  
  let [isOpen, setIsOpen] = useState(false)
  // const [numCompletedSubtasks, setNumCompletedSubtasks] = useState(0)
  // const [count, setCount] = useState();

 
  // useEffect(() => {
  //   setCount(numCompletedSubtasks)
  // }, [])

  const {
    register,
    control,
    handleSubmit,
    reset,
  } = useForm() 

  const boards = useAppSelector((state: RootState) => state.boards.value)
  const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)
  const dispatch = useAppDispatch()
  const statusOptionElements = getStatusOptions(currentBoard) 

  const percentage = getPercentage(numCompletedSubtasks, task)
  
  function closeModal() {
    setIsOpen(false)
    reset()
    setNumCompletedSubtasks(getNumCompletedSubtasks(task))
  }

  function openModal() {
    setIsOpen(true)
  }

  function onSubmit(data) {
    console.log(data)
    const updatedSubtasks = task.subtasks.map((subtask, index) => {
      return {...subtask, isCompleted: data.subtasks[subtask.title] }
    })

    const originalTask = task
    const updatedTask = {...task, subtasks: updatedSubtasks, status: data.status}
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
    console.log(updatedBoard)
    const updatedBoards = boards.map(board => board.name === currentBoard.name ? updatedBoard : board)
    dispatch(setAllBoards(updatedBoards))
    setIsOpen(false)
  }

  function handleChange(e) {
    e.target.nextSibling.classList.toggle('line-through')

    // update count ie keep track of subtasks completed
    setNumCompletedSubtasks(prev => (
      e.target.checked ? prev + 1 : prev - 1
    ))
  }


  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="text-gray-600 hover:text-gray-500 font-bold text-xs py-2 w-full"
        >
          
           <div className="mb-2 text-left">
                {`${numCompletedSubtasks} of ${task.subtasks.length} subtasks`}   
                  <div class="flex w-full h-1.5 bg-gray-400 rounded-full overflow-hidden dark:bg-gray-700 " role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
                    <div class="flex flex-col justify-center rounded-full overflow-hidden bg-indigo-500   text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500" style={{width: `${percentage}%`}}></div>
                  </div>
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
                 
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col' >
              
                  <button type='reset' 
                    onClick={closeModal} className='ml-auto text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-md mt-1 mr-1'> 
                    <img src="/assets/icon-cross.svg" alt='cross to close modal'/>
                  </button>
                  
                  <div className='m-10'>

                    <div className='flex'>
                      <p className='font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100'>{task.title}</p> 
                    </div> 
                  
                    <p className='mb-3'>{task.description ? task.description : 'No description'}</p>

                    <p className='text-gray-600 font-semibold mb-3'>Subtasks ({numCompletedSubtasks} of {task.subtasks.length})</p>

                    {/* subtasks */}
                    <ul>
                      {task.subtasks?.map((subtask) => {
                          return (
                              <li 
                                key={subtask.title} 
                                className='flex items-center my-3 bg-gray-200 py-2 rounded-lg pl-2'
                              >
                                <input
                                  style={{ backgroundImage: `url("/assets/icon-check.svg")`}}
                                  {...register( `subtasks.${subtask.title}`)}
                                  type='checkbox'
                                  defaultChecked={subtask.isCompleted}
                                  onChange={(e) => handleChange(e)}
                                  className={`appearance-none border border-slate-400  h-5 w-5  bg-no-repeat bg-center rounded-sm bg-white checked:bg-indigo-500`}
                                />
                                
                                <label 
                                  htmlFor={subtask.title}
                                  id={subtask.title}
                                  className={`text-gray-900 font-semibold text-xs ml-3 ${subtask.isCompleted ? 'line-through' : ''}`}
                                >     
                                  {subtask.title}
                                </label>
                              </li> 
                            )})}
                    </ul>
                      
                    {/* status */}
                    <section className='my-2 flex flex-col mt-5'>
                      <p >Status</p>
                      <select 
                        id='status' 
                        {...register('status')} 
                        className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1  pl-2 outline-none focus:border-indigo-500 mb-2'
                        defaultValue={task.status}
                      >
                        {statusOptionElements}
                      </select>
                    </section>

                    <input 
                      type='submit' 
                      value='Save Changes' 
                      className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 w-full cursor-pointer'
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
