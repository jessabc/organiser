import React from "react"

export default function loading() {
  return (
    <>
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between mb-5">
          <h3 className="mb-2 h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></h3>
          <div className="flex gap-2">
              <span className="size-12 block bg-gray-200 rounded-lg dark:bg-gray-700"></span>
              <span className="size-12 block bg-gray-200 rounded-lg dark:bg-gray-700"></span>
          </div>
        </div> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {(new Array(12).fill(0)).map((_, index) => (
            <div key={index}
              className="m-3 h-40 w-60 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
            ))}
        </div>
      </div>
    </>
  ) 
}
