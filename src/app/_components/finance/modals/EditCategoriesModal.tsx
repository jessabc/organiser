import { RootState } from "@/app/_redux/store";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCard } from "@/app/_redux/features/card/cardSlice";
import useModalToggle from "@/app/_hooks/useModalToggle";
import Modal from "../../shared/Modal";

export default function EditCategoriesModal() {

  const {isOpen, setIsOpen, closeModal, openModal} = useModalToggle()

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
      mode: "onChange"
  })
   
  const {
      fields,
      append,
      remove,
  } = useFieldArray({
      control,
      name: "categories",
  })

  function onSubmit(data:any) {      
    const editedCard = {
    ...data,
    categories: ["add",
        ...data.categories
    ],
    transactions: card.transactions,
    }

  dispatch(setCard(editedCard))
  closeModal()
}

  function ButtonProps() {
    return (
      <button
      type="button"
      onClick={openModal}
      className=""
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
    </button>
    )
  } 

  return (
    <>
      <Modal buttonProps={<ButtonProps/>} isOpen={isOpen} closeModal={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <button 
          type="reset" 
          className="ml-auto text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-md mt-1 mr-1"
          onClick={closeModal}
          > 
          <img src="/assets/icon-cross.svg" alt="cross icon to close modal"/> 
          </button>

          <div className="flex flex-col">
          <h3 className="font-semibold text-lg text-gray-900 mb-5 dark:text-zinc-100">Edit Category</h3>

          {/* categories */}
          <label htmlFor="categories">Categories</label>
          <div>
              <ul>
                  {fields.map((item, index) => {
                  return (
                      <li key={item.id} className="flex items-center">
                          <input
                              {...register(`categories.${index}`, { required: true })}
                              className="border-2 border-solid border-gray-300 rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none focus:border-indigo-500 w-full mr-1"
                          />
                          <button type="button" onClick={() => remove(index)} className="cursor-pointer">
                            <img src={"/assets/icon-cross.svg"} alt="cross icon to close modal" />
                          </button>
                      </li>
                  )})}
              </ul>

              <section>
              <button
                  type="button"
                  onClick={() => append("")}
                  className="text-indigo-500 bg-gray-200 rounded-full py-2 my-2 mt-3 w-full font-semibold "
              >
                  +Add New category
              </button>
              </section>
              </div>

              <input 
                  type="submit" 
                  value="Save Changes" 
                  className="text-gray-50 bg-indigo-500 hover:bg-indigo-400 rounded-full py-2 my-2 cursor-pointer" />
              </div>
        </form>
      </Modal>
    </>
  )
}