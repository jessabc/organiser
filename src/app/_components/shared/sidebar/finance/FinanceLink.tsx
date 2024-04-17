"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Props {
  link: string;
}

export default function FinanceLink({ link }: Props) {
  return (
    <li>
      <Link
        href={`/finance/${link.toLowerCase()}`}
        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
      >
        {link}
      </Link>
    </li>
  );
}
