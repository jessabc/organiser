// NOT CURRENTLY USING

// "use client"

// import useModalToggle from "@/app/_hooks/useModalToggle";
// import { setAllBoards } from "@/app/_redux/features/boards/boardsSlice";
// import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks";
// import { RootState } from "@/app/_redux/store";
// import { useForm, useFieldArray } from "react-hook-form";
// import Modal from "../../shared/Modal";
// import { Board } from "@/app/types/interfaces";

// export default function AddNewColumnModal() {

//   const [isOpen, setIsOpen, closeModal, openModal] = useModalToggle()
 
//   const boards: Board[] = useAppSelector((state: RootState) => state.boards.value)
//   const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)
//   const dispatch = useAppDispatch()

//   const columnsArray = currentBoard?.columns
  
//   const {
//         register,
//         control,
//         handleSubmit,
//     } = useForm({
//         defaultValues: {
//         name: currentBoard?.name,
//         columns: columnsArray
//         },
//         mode: "onChange"
//     })

//     const {
//         fields,
//         append,
//         remove,
//     } = useFieldArray({
//         control,
//         name: "columns",
//     })

//   function onSubmit(data) {      
//       let updatedBoards = boards.map(board => board.name === data.name ? data : board)
//       dispatch(setAllBoards(updatedBoards))
//       closeModal()
//   }
 
//   function ButtonProps() {
//     return (
//       <button
//           type="button"
//           onClick={openModal}
//           className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
//         </button>
//     )
//   } 

//   return (
//     <>
//       <Modal buttonProps={<ButtonProps/>} isOpen={isOpen} closeModal={closeModal}>
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
//           <button 
//             onClick={closeModal} 
//             className="ml-auto text-2xl bg-gray-200 p-2 rounded-md mt-1 mr-1 hover:bg-gray-300">
//             <img src="/assets/icon-cross.svg" alt="cross icon to close modal" />
//           </button>

//           <h3 className="font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100">Add New Column</h3>

//           <label htmlFor="name">Name</label>
//           <input 
//             defaultValue={currentBoard?.name} 
//             {...register("name")} 
//             className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 mb-2" 
//             disabled
//           />

//           <label>Columns</label>
//           <ul>
//             {fields.map((item, index) => {
//             return (
//                 <li key={item.id} className="flex items-center">
//                     <input
//                         {...register(`columns.${index}.name`, { required: true })}
//                         className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1"
//                     />
//                     <button type="button" onClick={() => remove(index)} className="cursor-pointer">
//                         <img src={"/assets/icon-cross.svg"} alt="cross icon to close modal" />
//                     </button>
//                 </li>
//               )})}
//           </ul>

//           <button
//             type="button"
//             onClick={() => {append({id: "", name: "", tasks:[]})}}
//             className="text-indigo-500 bg-gray-200 rounded-full py-2 my-2 mt-3 w-full font-semibold hover:bg-gray-300"
//           >
//             +Add New Column
//           </button>

//           <input 
//             type="submit" 
//             value="Save Changes" 
//             className="text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer" />
//           </form>
//         </Modal>
//     </>
//   )
// }


