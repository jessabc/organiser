import { setAllBoards } from '@/app/_redux/features/boards/boardsSlice';
import { useAppDispatch, useAppSelector } from '@/app/_redux/hooks';
import { RootState } from '@/app/_redux/store';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { setCurrentBoard } from '@/app/_redux/features/boards/currentBoardSlice';
import { usePathname } from 'next/navigation';


export default function EditBoardModal() {
  
  let [isOpen, setIsOpen] = useState(false)

  const boards = useAppSelector((state: RootState) => state.boards.value)
  const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  
  const columnsArray = currentBoard?.columns

  const {
    register,
    control,
    handleSubmit,
    reset,
  } = useForm({
      defaultValues: {
      columns: columnsArray
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

  function closeModal() {
    setIsOpen(false)
    reset()
  }

  function openModal() {
    setIsOpen(true)
  }

  function onSubmit(data) { 
    const updatedBoards = boards.map(board => board.name === currentBoard.name ? data : board)
    console.log(updatedBoards)
    dispatch(setAllBoards(updatedBoards)) 
    router.push(`/project/${data.name}`)
    setIsOpen(false)
  }
 

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className={`${pathname === '/' ? "hover:text-gray-500 " : "rounded-md bg-indigo-500  px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"}`}
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
                
                 
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>

                  <button type='reset' 
                    onClick={closeModal} className='ml-auto text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-md mt-1 mr-1'> 
                    <img src="/assets/icon-cross.svg" alt='cross to close modal'/>
                  </button>

                  <h3 className='font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100'>Edit Board</h3>
                
                  <label htmlFor='name'>Name</label>
                  <input 
                      defaultValue={currentBoard?.name} 
                      {...register('name')} 
                      className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2'/>
              
                  <p>Columns</p>
                  <ul>
                      {fields.map((item, index) => {
                      return (
                          <li key={item.id} className='flex items-center'>
                              <input
                                  {...register(`columns.${index}.name`, { required: true })}
                                  className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1'
                              />
                              <button type='button' onClick={() => remove(index)} className='cursor-pointer'>
                                  <img src="/assets/icon-cross.svg" alt='cross icon to close modal' />
                              </button>
                          </li>
                      )})}
                  </ul>

                  <button
                      type='button'
                      onClick={() => {append({id: '', name: '', tasks:[]})}}   
                      className='text-indigo-500 bg-gray-200 rounded-full py-2 my-2 mt-3 w-full font-semibold hover:bg-gray-300'
                  >
                      +Add New Column
                  </button>

                  <input 
                      type='submit' 
                      value='Save Changes' 
                      className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer' />
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
