import React from "react";
import DashboardLink from "./DashboardLink";
import FinanceAccordian from "./finance/FinanceAccordian";
import BoardsAccordian from "./projects/BoardsAccordian";
import Link from "next/link";

export default function Sidebar() {
  return (
    // <!-- Sidebar -->
    <div
      id="application-sidebar"
      className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0  w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700 z-20 sm:z-10 "
    >
      {/* removed z-[60] so modal will work */}

      <div className="px-6">
        <Link
          className="flex-none text-2xl  dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600  font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-indigo-800"
          href={"/"}
          aria-label="Brand"
        >
          Organiser.
        </Link>
      </div>

      <nav
        className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          <DashboardLink />
          <FinanceAccordian />
          <BoardsAccordian />

          {/*TO ADD IN THE FUTURE */}
          {/* <TodosLink/> */}
        </ul>
      </nav>
    </div>
    //   <!-- End Sidebar -->
  );
}
