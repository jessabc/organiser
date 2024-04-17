import React from "react";
import NavigationToggle from "./NavigationToggle";
import Breadcrumb from "./Breadcrumb";

export default function SidebarToggle() {
  return (
    // <!-- Sidebar Toggle -->
    <div className="sticky top-0 inset-x-0  bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
      {/* removed z-20 so modal could work */}
      <div className="flex items-center py-4">
        {/* <!-- Navigation Toggle --> */}
        <NavigationToggle />
        {/* <!-- End Navigation Toggle --> */}

        {/* <!-- Breadcrumb --> */}
        <Breadcrumb
          homeElement={"Dashboard"}
          separator={
            <span>
              <svg
                className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-gray-600"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          }
          activeClasses="text-sm font-semibold text-gray-800 truncate dark:text-gray-400"
          containerClasses="ms-3 flex items-center whitespace-nowrap"
          listClasses="hover:underline mx-2  flex items-center text-sm text-gray-800 dark:text-gray-400"
          capitalizeLinks
        />
        {/* <!-- End Breadcrumb --> */}
      </div>
    </div>
    // <!-- End Sidebar Toggle -->
  );
}
