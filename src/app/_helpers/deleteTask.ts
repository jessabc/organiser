import { ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";
import { Board, IColumn, ITask } from "../types/interfaces";

// @ts-ignore
export default function deleteTask(
  currentBoard: Board,
  task: ITask,
  dispatch: Dispatch,
  boards: Board[],
  // TS TO FIX
  // @ts-ignore
  setAllBoards
) {
  let updatedColumns: IColumn[] = [];
  currentBoard.columns.forEach((column) => {
    if (column.name === task.status) {
      const updatedTasks = column.tasks.filter(
        (item) => item.title != task.title
      );
      const updatedColumn = { ...column, tasks: updatedTasks };
      updatedColumns = [...updatedColumns, updatedColumn];
    } else {
      updatedColumns = [...updatedColumns, column];
    }
  });

  const updatedBoard = { ...currentBoard, columns: updatedColumns };
  const updatedBoards = boards.map((board) =>
    board.name === currentBoard.name ? updatedBoard : board
  );
  dispatch(setAllBoards(updatedBoards));
}
