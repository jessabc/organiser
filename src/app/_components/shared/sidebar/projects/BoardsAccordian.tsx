"use client";

import { RootState } from "@/app/_redux/store";
import React from "react";
import BoardNameLink from "./BoardNameLink";
import Link from "next/link";
import { useAppSelector } from "@/app/_redux/hooks";
import { Board } from "@/app/types/interfaces";

export default function BoardsAccordian() {
  const boards: Board[] = useAppSelector(
    (state: RootState) => state.boards.value
  );

  const boardNameEl = boards?.map((board) => (
    <BoardNameLink key={board.name} board={board} />
  ));

  return (
    <li className="hs-accordion" id="projects-accordion">
      <button
        type="button"
        className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-brand-trello"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M7 7h3v10h-3z" />
          <path d="M14 7h3v6h-3z" />
        </svg>
        Projects
        <svg
          className="hs-accordion-active:block ms-auto hidden size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
        <svg
          className="hs-accordion-active:hidden ms-auto block size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id="projects-accordion-child"
        className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
      >
        <ul className="pt-2 ps-2">
          {boardNameEl}
          <Link
            href={"/projects/new"}
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
          >
            + New Board
          </Link>
        </ul>
      </div>
    </li>
  );
}
