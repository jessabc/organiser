import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import MenuItem from "./MenuItem"
import { useAppSelector } from "@/app/_redux/hooks"
import { RootState } from "@/app/_redux/store"

const transactionTypesData = ["income", "expense"]
 
interface Props {
  setFilterQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function FilterDropdown({setFilterQuery}: Props) {

  const card = useAppSelector((state: RootState) => state.card.value)

  // remove 'add' from category array
  const categories = (card.categories).slice(1)

  const categoriesEl = categories.map(category => <MenuItem key={category} item={category} setFilterQuery={setFilterQuery}/>)

  // income and expense
  const transactionTypeEl = transactionTypesData.map(transactionType => <MenuItem key={transactionType} item={transactionType} setFilterQuery={setFilterQuery}/>)

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 flex gap-1">
            Filter by
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down"  width="18" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-40 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none ">
            <div className="px-1 py-1">
              {transactionTypeEl}
            </div>
            <div className="px-1 py-1">
              {categoriesEl}
            </div>
            <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                  <button
                  className={`${
                      active ? "bg-gray-100 dark:bg-gray-700" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => setFilterQuery("")}
                  >
                    Clear filter
                  </button>
              )}
            </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}


