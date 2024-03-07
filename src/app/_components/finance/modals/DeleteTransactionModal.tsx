"use client"

import useModalToggle from "@/app/_hooks/useModalToggle"
import { setAllTransactions } from "@/app/_redux/features/card/cardSlice"
import { RootState } from "@/app/_redux/store"
import { useDispatch, useSelector } from "react-redux"
import Modal from "../../shared/Modal"
import { Card, Transaction } from "@/app/types/interfaces"

interface Props {
  thisTransaction: Transaction
}
 
export default function DeleteTransactionModal({thisTransaction}: Props) {
 
  const {isOpen, setIsOpen, closeModal, openModal} = useModalToggle()

  const card: Card = useSelector((state: RootState) => state.card.value)
  const dispatch = useDispatch()

  function handleOnDelete() {
    const updatedTransactions = card.transactions.filter(transaction => transaction.id != thisTransaction.id)
    dispatch(setAllTransactions(updatedTransactions))
    closeModal
  }

  function ButtonProps() {
    return (
      <button
        type="button"
        onClick={openModal}
        className="hover:text-gray-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
      </button>
    )
  } 

  return (
      <>
        <Modal buttonProps={<ButtonProps/>} isOpen={isOpen} closeModal={closeModal}>
          <div className="flex flex-col"> 
            <button 
              onClick={closeModal} 
              className="ml-auto text-2xl bg-gray-200 p-2 rounded-md mt-1 mr-1 hover:bg-gray-300">
              
              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
            </button>
 
            <div className="m-5">
              <p className="font-semibold text-lg text-red-500 mb-3">Delete  transaction</p>
              <p className="mb-5">Are you sure you want to delete this transaction?</p>

              <div className="flex gap-2 mt-3">
                <button 
                  onClick={handleOnDelete} 
                  className="bg-red-400 text-white rounded-full py-2 w-1/2 hover:bg-red-500">
                Delete
                </button>

                <button 
                  onClick={closeModal} 
                  className="text-indigo-500 bg-gray-200 rounded-full py-2 font-semibold w-1/2 hover:bg-gray-300">
                Cancel
                </button> 
              </div>
            
            </div> 
          </div> 
         </Modal>
      </>
  )
}
