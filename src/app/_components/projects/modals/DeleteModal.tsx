import { useAppSelector } from '@/app/_redux/hooks'
import { RootState } from '@/app/_redux/store'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { usePathname } from 'next/navigation'


export default function DeleteModal({deleteProps}) {

  let [isOpen, setIsOpen] = useState(false)

  const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)
  const pathname = usePathname()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className={`${deleteProps.headerText === 'Delete this task?' || pathname === '/' ? "hover:text-gray-500 " : "rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
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

                <div className='flex flex-col'> 
                  <button 
                    onClick={closeModal} 
                    className='ml-auto text-2xl bg-gray-200 p-2 rounded-md mt-1 mr-1 hover:bg-gray-300'>
                    <img src="/assets/icon-cross.svg" alt='cross icon to close modal' />
                  </button>

                  <div className='m-5'>
                    <p className='font-semibold text-lg text-red-500 mb-3'>{deleteProps.headerText}</p>
                    <p className='mb-5'>{deleteProps.paragraphText}</p>

                    <div className='flex gap-2 mt-3'>
                      <button 
                        onClick={deleteProps.onDelete} 
                        className='bg-red-400 text-white rounded-full py-2 w-1/2 hover:bg-red-500'>
                      Delete
                      </button>

                      <button 
                        onClick={closeModal} 
                        className='text-indigo-500 bg-gray-200 rounded-full py-2 font-semibold w-1/2 hover:bg-gray-300'>
                      Cancel
                      </button> 
                    </div>
                  
                  </div> 
                </div> 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
