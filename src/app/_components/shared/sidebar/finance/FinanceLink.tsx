import React from 'react'
import Link from 'next/link'

export default function FinanceLink({link}) {
 

  return (
    <li>
    <Link href={`/${link}`} className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
      {link}
    </Link>
  </li>
  )
}
