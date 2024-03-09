"use client"

import React, { useState } from "react"
import Link from "next/link"

interface Props {
  link: string
}

export default function FinanceLink({link}: Props) {
  
  return (
    <li>
      <Link 
        href={`/finance/${link.toLowerCase()}`} 
        className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
        {link}
    </Link>
  </li> 
  )
}
