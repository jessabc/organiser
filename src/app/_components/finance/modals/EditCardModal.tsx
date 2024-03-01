
import { RootState } from '@/app/_redux/store';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { setCard } from '@/app/_redux/features/card/cardSlice';


export default function EditCardModal() {

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  const card = useSelector((state: RootState) => state.card.value)
  const dispatch = useDispatch()

  const categories = (card.categories).slice(1)

  const {
      register,
      control,
      handleSubmit,
  } = useForm({
      defaultValues: {
      amount: card.amount,
      categories: categories
      },
      mode: 'onChange'
  })
  
  const {
      fields,
      append,
      remove,
  } = useFieldArray({
      control,
      name: 'categories',
  })


  function onSubmit(data:any) {      
    const editedCard = {
    ...data,
    categories: ['add',
        ...data.categories
    ],
    transactions: card.transactions,
    }

    dispatch(setCard(editedCard))
    closeModal()
  }


    return (
      <>
        <div className="">
          <button
            type="button"
            onClick={openModal}
            className="text-gray-100 "
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
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

                          <button 
          type='reset' 
          className='ml-auto text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-md mt-1 mr-1'
          onClick={closeModal}
        > 
          <img src='/assets/icon-cross.svg' alt='cross icon to close modal'/> 
        </button>

        <div className='m-10 flex flex-col'>
          <h3 className='font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100'>Edit Card</h3>
            
            {/* amount */}
                              <label htmlFor='amount'>Amount</label>
                              <input 
                                type='number'
                                  defaultValue={card.amount} 
                                  {...register('amount')} 
                                  className='border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2' 
                                  />

                              <input 
                                  type='submit' 
                                  value='Save Changes' 
                                  className='text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer' />
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