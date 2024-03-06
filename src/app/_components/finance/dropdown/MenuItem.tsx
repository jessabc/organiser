import React from "react"
import { Menu } from "@headlessui/react"

interface Props {
  item: string,
  setFilterQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function MenuItem({item, setFilterQuery}: Props) {
 
  return (
    <Menu.Item>
        {({ active }) => (
            <button
            className={`${
                active ? "bg-gray-100" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            onClick={() => setFilterQuery(item)}
            >
              {item}
            </button>
        )}
    </Menu.Item>
  )
}
