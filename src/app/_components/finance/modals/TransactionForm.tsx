"use client"

import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { RootState } from "@/app/_redux/store"
import { updateAmount, updateCategories } from "@/app/_redux/features/card/cardSlice"
import { setAllTransactions } from "@/app/_redux/features/card/cardSlice"
import { Card, Transaction } from "@/app/types/interfaces"
 
const schema = yup.object({
  type: yup.string().required("Transaction Type is a required field"),
  notes: yup.string().required("Notes is a required field"),
  amount:yup.string().required("Amount is a required field"),
  category: yup.string().required("Category is a required field"),
  date: yup.string().required("date is a required field"),
}).required();
 
type FormData = yup.InferType<typeof schema>

type Inputs = {
  type: string,
  amount: string,
  date: string
  category:  string
  notes: string
}

interface Props {
  closeModal: () => void,
  modalProps: {
    openButtonText: string,
    header: string,
    thisTransaction: Transaction 
  }
}

export default function TransactionForm({closeModal, modalProps}: Props) {

  const [newCategoryVisible, setNewCategoryVisible] = useState(false)
  const [newCategory, setNewCategory] = useState("")

  const card: Card = useSelector((state: RootState) => state.card.value) 
  const {amount, categories} = useSelector((state: RootState) => state.card.value)   
  const dispatch = useDispatch()

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // new transaction object
    const newTransaction =   {
      id: modalProps.thisTransaction? modalProps.thisTransaction.id : Math.random(),
      type: data.type,
      amount: parseInt(data.amount),
      date: data.date,
      category:  data.category === "Add New Category" ? newCategory : data.category,
      notes: data.notes,
    }

    // if new transaction then
    if(modalProps.openButtonText === "new") {
      // add new transaction to transactions array
      dispatch(setAllTransactions([...card.transactions, newTransaction]))
    } else {
      // else if edited transaction replace old transaction with edited transaction
      const updatedTransactions = card.transactions.map(transaction => transaction.id === modalProps.thisTransaction.id ? newTransaction: transaction)
      dispatch(setAllTransactions(updatedTransactions))
    }
  
    // update card amount ie either plus or minus new transaction amount
    if(data.type === "income") {
      dispatch(updateAmount(card.amount + parseInt(data.amount)))
    } else {
      dispatch(updateAmount(card.amount - parseInt(data.amount)))
    }
    
    //  if new category, add new category to category array
    if(newCategory) {
      dispatch(updateCategories([...categories, newCategory]))
    }

    reset();
    closeModal()      
  } 
    
  const checkOnChange = (value: string) => {
    if(value === "Add New Category") {
      setNewCategoryVisible(true)
    } else {
      setNewCategoryVisible(false) 
      setNewCategory("")
    }
  }

  return (
    <>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <button 
          type="reset" 
          className="ml-auto text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-md mt-1 mr-1"
          onClick={closeModal}
        > 
          <img src="/assets/icon-cross.svg" alt="cross icon to close modal"/> 
        </button>

        <div className="flex flex-col">
          <h3 className="font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100">{modalProps.openButtonText === "new" ? "Add New" : "Edit"} Transaction</h3>

          {/* income/expense radio button */}
          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="amount">Transaction Type</label>
            <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.type?.message}</p>
            <div className={``}>
              {/* income */}
              <input 
                {...register("type")} 
                type="radio" 
                value="income" 
                id="income" 
                defaultChecked = {modalProps.thisTransaction ?  modalProps.thisTransaction.type === "income" ? true : false : false}
                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              />
              <label 
                htmlFor="income" 
                className="text-sm text-gray-500 ms-2 dark:text-gray-400"> 
                Income
              </label> 
            </div>

            <div>
              {/* expense */}
              <input 
                {...register("type")} 
                type="radio" 
                value="expense" 
                id="expense" 
                defaultChecked = {modalProps.thisTransaction ?  modalProps.thisTransaction.type === "expense" ? true : false : true} 
                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              />
              <label 
                htmlFor="expense" 
                className="text-sm text-gray-500 ms-2 dark:text-gray-400"> 
                Expense
              </label>
            </div>
          </div>

          {/* amount */}
          <div className="flex flex-col gap-2 mb-5">
            <div className={`flex justify-between items-center`}>
              <label htmlFor="amount" className={`${errors.amount ? "text-error": ""}`}>Amount</label>
              <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.amount?.message}</p>
            </div>
            <input 
            type="number"
              id="amount" 
              {...register("amount")} 
              defaultValue={modalProps.openButtonText === "edit" ? modalProps.thisTransaction.amount : ""} placeholder="20" 
              className={`border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2 ${errors.amount ? "focus:outline-error ": ""}`}/>
          </div>

          {/* date */}
          <div className="flex flex-col gap-2 mb-5">
            <div className={`flex justify-between items-center`}>
              <label htmlFor="date" className={`${errors.date ? "text-error": ""}`}>Date</label>
              <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.date?.message}</p>
            </div>
            <input 
            type="date"
              id="date" 
              {...register("date")} 
              defaultValue={modalProps.openButtonText === "edit" ? modalProps.thisTransaction.date : ""} 
              className={`border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2 ${errors.date ? "focus:outline-error ": ""}`}/>
          </div>

          {/* notes */}
          <div className={``}>
            <div className={`flex justify-between items-center`}>
              <label htmlFor="notes"  className={` ${errors.notes ? "text-error": ""}`}>Notes</label>
              <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.notes?.message}</p>
            </div>
            <input 
              id="notes" 
              defaultValue={modalProps.openButtonText === "edit" ? modalProps.thisTransaction.notes : ""} 
                    placeholder="e.g. coffee and pastry" 
              {...register("notes")} 
              className={`border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2 w-full ${errors.notes ? "focus:outline-error ": ""} `}/>
          </div>
          
          {/* category */}
          <section className="my-2 flex flex-col ">
            <div className={`flex justify-between items-center`}>
              <label 
                htmlFor="category" 
                className={` ${errors.category ? "text-error": ""}`}>
                Category
              </label>
              <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.category?.message}</p>
            </div>
            <select 
              id="category" 
              {...register("category")} 
              className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1  pl-2 outline-none focus:border-indigo-500 mb-2"
              onChange={(e) => checkOnChange(e.target.value)} defaultValue={modalProps.openButtonText === "edit" ? modalProps.thisTransaction.category : ""}
              >
                <option label="--Select Category-- "></option>
                {categories.map(option => (
                  <option key={option} value={option}>{option}</option> 
                  
                ))}
            </select>
          </section>

          {/* new category */}
          <div className={`${newCategoryVisible ? "block" : "hidden"}`}>
            <div className={`flex justify-between items-center`}>
              <label 
              htmlFor="newCategory" 
              //    NEED TO FIX
              // className={`${errors.newCategory?.message ? "text-error": ""}`}
              >
              New Category
              </label> 
              {/* NEED TO FIX */}
              {/* <p className={`font-medium text-sm leading-4 tracking-tight text-error`}>{errors.newCategory?.message}</p> */}
            </div>
            <input 
              id="newCategory" 
              placeholder="e.g. gym" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)} 
              className={`border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2 w-full ${errors.notes ? "focus:outline-error ": ""} `}
            />  
          </div>

          <input 
            type="submit" 
            className="text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer"
            />
        </div>
      </form>
    </>
  )
}
