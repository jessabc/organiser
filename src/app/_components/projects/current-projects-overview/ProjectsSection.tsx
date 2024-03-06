"use client"

import { useAppSelector } from "@/app/_redux/hooks"
import { RootState } from "@/app/_redux/store"
import React from "react"
import BoardCard from "./BoardCard"
import { Board } from "@/app/types/interfaces"

export default function ProjectsSection() {

  const boards:Board[] = useAppSelector((state: RootState) => state.boards.value)

  const boardEl = boards.map((board, index) => <BoardCard key={index} board={board} />)

  return (  
    <div className="my-10">
      <div className="flex gap-2 items-end mb-2">
        <h4 className="font-bold text-xl">Current Projects</h4>
      </div>
      {boards.length > 0 ? 
      (<div className="grid gap-2 grid-cols-2">
        {boardEl}
      </div>) 
      :
      (<div className="grid gap-2 grid-cols-2">
        {new Array(4).fill(0).map((_, index) => <Skeleton key={index}/>)}   
      </div>)}
    </div>
  )
}
 
function Skeleton() {
  return (
    <div className="flex justify-between gap-5 h-20 bg-opacity-40 items-center py-2 px-8  rounded-xl w-full  bg-gray-200  dark:bg-gray-700 animate-pulse"></div>
  )
}