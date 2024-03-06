import { Droppable } from "react-beautiful-dnd";
import  Task  from "./Task"
import { useEffect, useState } from "react";
import AddNewTaskModal from "../modals/AddNewTaskModal";
import { Column } from "@/app/types/interfaces";

interface Props {
  column: Column,
}
 
export default function Column({column}: Props) {

  // https://github.com/atlassian/react-beautiful-dnd/issues/2399
  const [ enabled, setEnabled ] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
       cancelAnimationFrame(animation);
       setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  // end dnd issue

  const taskElements = column.tasks.map((task, index) => <Task key={task.title} task={task} index={index}/>)
  
  return (
      //credit to https://dev.to/imjoshellis/codealong-multi-column-drag-and-drop-in-react-3781
      <Droppable droppableId={column.name}>
      {provided => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="flex flex-col items-start gap-2 mb-2 w-60 pt-10 justify-between">
            <div className="flex gap-1 items-center">
              <p className="uppercase text-gray-500 font-semibold tracking-wider text-sm">
                {column.name} ({column.tasks.length})
              </p>
            </div>
            <div className="my-2">
              <AddNewTaskModal/>
            </div> 
          </div>

          {column.tasks.length === 0 && 
          <div className="rounded-lg  h-screen w-60 border-4 border-dashed border-gray-300"></div>}
            
          <div>
            {taskElements}
          </div>

          {provided.placeholder}
        </div>
        )}
      </Droppable>
)
}

